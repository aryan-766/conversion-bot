import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  RefreshCw,
  Plus,
  CheckCircle,
  AlertCircle,
  Sparkles,
  FileText,
  Globe,
  Database,
  Search,
  ExternalLink
} from 'lucide-react';
import { KnowledgeGap } from '../../types';

export const KnowledgeTab: React.FC = () => {
  const {
    knowledgeDocs,
    knowledgeGaps,
    approveKnowledgeGap,
    syncKnowledgeBase,
    isSyncingKnowledge
  } = useApp();

  const [activeGapModal, setActiveGapModal] = useState<KnowledgeGap | null>(null);
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [showAddDoc, setShowAddDoc] = useState<boolean>(false);

  const pendingGaps = knowledgeGaps.filter(g => g.status === 'detected');
  const approvedGaps = knowledgeGaps.filter(g => g.status === 'approved');

  const handleOpenGap = (gap: KnowledgeGap) => {
    setActiveGapModal(gap);
    setCustomAnswer(gap.suggestedAnswer);
  };

  const handleApproveGap = () => {
    if (!activeGapModal) return;
    approveKnowledgeGap(activeGapModal.id, customAnswer);
    setActiveGapModal(null);
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header with Sync Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zinc-300" />
            Knowledge Base & Continuous Sync Engine
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Vectorized business documents, policy sync, and autonomous Knowledge Gap resolution.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddDoc(true)}
            className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center space-x-1.5 border border-zinc-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Manual FAQ / Doc</span>
          </button>
          <button
            onClick={syncKnowledgeBase}
            disabled={isSyncingKnowledge}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncingKnowledge ? 'animate-spin' : ''}`} />
            <span>{isSyncingKnowledge ? 'Syncing...' : 'Sync Knowledge Base'}</span>
          </button>
        </div>
      </div>

      {/* Knowledge Gap Engine Banner */}
      <div className="p-5 rounded-2xl bg-[#13151E] border border-zinc-700 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-zinc-300" />
            <h2 className="text-sm font-bold text-white">
              Autonomous Knowledge Gap Engine ({pendingGaps.length} Action Items)
            </h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 font-semibold border border-zinc-700">
            Detected from Live Conversations
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          When visitors ask questions that the current Knowledge Base cannot answer with high confidence, the system flags the gap, aggregates frequency, and pre-generates a brand-tailored answer for your 1-click approval.
        </p>

        <div className="space-y-3">
          {pendingGaps.map(gap => (
            <div
              key={gap.id}
              className="p-4 rounded-xl bg-[#0E1017] border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">"{gap.question}"</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Asked {gap.frequency} times
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                  <span>First asked: {gap.firstAsked}</span>
                  <span>•</span>
                  <span>Last asked: {gap.lastAsked}</span>
                </div>
                <div className="text-xs text-zinc-300 italic pt-1">
                  AI Suggested Answer: "{gap.suggestedAnswer}"
                </div>
              </div>

              <button
                onClick={() => handleOpenGap(gap)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold flex items-center justify-center space-x-1 shrink-0 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Review & Add Answer</span>
              </button>
            </div>
          ))}

          {pendingGaps.length === 0 && (
            <div className="p-3 rounded-xl bg-[#0E1017] text-xs text-zinc-300 flex items-center space-x-2 border border-zinc-800">
              <CheckCircle className="h-4 w-4 text-zinc-300" />
              <span>All detected customer question gaps have been reviewed and approved!</span>
            </div>
          )}
        </div>
      </div>

      {/* Synced Knowledge Documents List */}
      <div className="p-5 rounded-2xl bg-[#13151E] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Active Vectorized Knowledge Documents</h2>
            <p className="text-xs text-zinc-400">Total {knowledgeDocs.reduce((acc, d) => acc + d.chunksCount, 0)} chunk embeddings in active RAG index</p>
          </div>
          <span className="text-xs text-zinc-400">
            Last synced: <strong className="text-white">4 minutes ago</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {knowledgeDocs.map(doc => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200">
                    {doc.type === 'website' ? <Globe className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{doc.title}</h3>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {doc.chunksCount} chunks • Synced {doc.lastSynced}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium">
                  {doc.status}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {doc.previewText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Knowledge Gap Modal */}
      {activeGapModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13151E] border border-zinc-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Approve Knowledge Gap Answer</h2>
            <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 text-xs text-zinc-300">
              <strong>Question:</strong> "{activeGapModal.question}"
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-zinc-400">Verified Answer (AI will vectorize this response):</label>
              <textarea
                rows={4}
                value={customAnswer}
                onChange={e => setCustomAnswer(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setActiveGapModal(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveGap}
                className="px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold"
              >
                Approve & Update Knowledge Base
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
