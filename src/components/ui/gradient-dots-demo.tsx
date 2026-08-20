import React from 'react';
import { GradientDots } from "@/components/ui/gradient-dots";

export default function DefaultDemo() {
	return (
		<main className="relative flex size-full min-h-screen w-full items-center justify-center bg-[#0D0E12] text-white">
			<GradientDots duration={20} backgroundColor="#0D0E12" />
			<h1 className="text-6xl text-center font-extrabold z-10">Gradient Dots</h1>
		</main>
	);
}
