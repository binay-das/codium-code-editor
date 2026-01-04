export default function CodeBlock() {
    return (
        <section className="relative w-full max-w-4xl px-4 pb-24">
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
                    <div className="ml-2 text-xs text-zinc-500">example.java</div>
                </div>
                <div className="p-4 font-mono text-sm text-zinc-300">

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">1</span>
                        <span>
                            <span className="text-purple-400">import</span>{" "}
                            <span className="text-yellow-200">java.util.Scanner</span>;
                        </span>
                    </div>


                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">2</span>
                        <span>&nbsp;</span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">3</span>
                        <span>
                            <span className="text-purple-400">public</span>{" "}
                            <span className="text-purple-400">class</span>{" "}
                            <span className="text-yellow-200">Welcome</span>{" "}
                            {"{"}
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">4</span>
                        <span>&nbsp;</span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">5</span>
                        <span>
                            &nbsp;&nbsp;
                            <span className="text-purple-400">public</span>{" "}
                            <span className="text-purple-400">static</span>{" "}
                            <span className="text-purple-400">void</span>{" "}
                            <span className="text-blue-400">main</span>(
                            <span className="text-yellow-200">String</span>[]{" "}
                            <span className="text-blue-300">args</span>){" "}
                            {"{"}
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">6</span>
                        <span>&nbsp;</span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">7</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-yellow-200">Scanner</span>{" "}
                            <span className="text-blue-300">scanner</span>{" "}
                            = <span className="text-purple-400">new</span>{" "}
                            <span className="text-yellow-200">Scanner</span>(
                            <span className="text-blue-300">System</span>.in);
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">8</span>
                        <span>&nbsp;</span>
                    </div>
                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">9</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-300">System</span>.out.println(
                            <span className="text-green-300">&quot;Enter your name:&quot;</span>);
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">10</span>
                        <span>&nbsp;</span>
                    </div>
                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">11</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-yellow-200">String</span>{" "}
                            <span className="text-blue-300">name</span>{" "}
                            = <span className="text-blue-300">scanner</span>.nextLine();
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">12</span>
                        <span>&nbsp;</span>
                    </div>
                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">13</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-300">System</span>.out.println(
                            <span className="text-green-300">
                                &quot;Welcome &quot;
                            </span>
                            + <span className="text-blue-300">name</span> +{" "}
                            <span className="text-green-300">
                                &quot; to Codium, the most powerful online code editor&quot;
                            </span>);
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">14</span>
                        <span>&nbsp;</span>
                    </div>
                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">15</span>
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-blue-300">scanner</span>.close();
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">16</span>
                        <span>&nbsp;</span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">17</span>
                        <span>&nbsp;&nbsp;{"}"}</span>
                    </div>

                    <div className="flex">
                        <span className="w-8 select-none text-zinc-700">18</span>
                        <span>{"}"}</span>
                    </div>
                </div>

            </div>
            <div className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 blur-2xl"></div>
        </section>
    );
}
