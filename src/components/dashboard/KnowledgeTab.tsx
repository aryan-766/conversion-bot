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
  const [newDocTitle, setNewDocTitle] = useState<string>('');
  const [newDocText, setNewDocText] = useState<string>('');
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
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header with Sync Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            Knowledge Base & Continuous Sync Engine
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Vectorized business documents, policy sync, and autonomous Knowledge Gap resolution.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddDoc(true)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Manual FAQ / Doc</span>
          </button>
          <button
            onClick={syncKnowledgeBase}
            disabled={isSyncingKnowledge}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncingKnowledge ? 'animate-spin' : ''}`} />
            <span>{isSyncingKnowledge ? 'Syncing...' : 'Sync Knowledge Base'}</span>
          </button>
        </div>
      </div>

      {/* Knowledge Gap Engine Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/30 border border-rose-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-rose-400" />
            <h2 className="text-sm font-bold text-white">
              Autonomous Knowledge Gap Engine ({pendingGaps.length} Action Items)
            </h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
            Detected from Live Conversations
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          When visitors ask questions that the current Knowledge Base cannot answer with high confidence, the system flags the gap, aggregates frequency, and pre-generates a brand-tailored answer for your 1-click approval.
        </p>

        <div className="space-y-3">
          {pendingGaps.map(gap => (
            <div
              key={gap.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">"{gap.question}"</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Asked {gap.frequency} times
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>First asked: {gap.firstAsked}</span>
                  <span>•</span>
                  <span>Last asked: {gap.lastAsked}</span>
                </div>
                <div className="text-xs text-emerald-400/90 italic pt-1">
                  AI Suggested Answer: "{gap.suggestedAnswer}"
                </div>
              </div>

              <button
                onClick={() => handleOpenGap(gap)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1 shrink-0 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Review & Add Answer</span>
              </button>
            </div>
          ))}

          {pendingGaps.length === 0 && (
            <div className="p-3 rounded-xl bg-slate-950/40 text-xs text-emerald-400 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>All detected customer question gaps have been reviewed and approved!</span>
            </div>
          )}
        </div>
      </div>

      {/* Synced Knowledge Documents List */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Active Vectorized Knowledge Documents</h2>
            <p className="text-xs text-slate-400">Total {knowledgeDocs.reduce((acc, d) => acc + d.chunksCount, 0)} chunk embeddings in active RAG index</p>
          </div>
          <span className="text-xs text-slate-400">
            Last synced: <strong className="text-emerald-400">4 minutes ago</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {knowledgeDocs.map(doc => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                    {doc.type === 'website' ? <Globe className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{doc.title}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {doc.chunksCount} chunks • Synced {doc.lastSynced}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {doc.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {doc.previewText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Knowledge Gap Modal */}
      {activeGapModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Approve Knowledge Gap Answer</h2>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong>Question:</strong> "{activeGapModal.question}"
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-400">Verified Answer (AI will vectorize this response):</label>
              <textarea
                rows={4}
                value={customAnswer}
                onChange={e => setCustomAnswer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveGapModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveGap}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
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
