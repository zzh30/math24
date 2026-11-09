// 《信息论基础（第 2 版）》第二章 双数题（2.2 ~ 2.48，共 24 题）
// 题目为中文翻译；解答参考 Cover & Thomas 官方 Solutions Manual（solutions2.pdf），
// 按手写解题习惯逐步推导，右侧括号注明所依据的定理/性质。
const PROBLEMS = [
{
  no: 2,
  en: "Entropy of functions",
  title: "熵与函数",
  problem: `设 $X$ 是取有限多个值的随机变量。问下列情形中 $H(X)$ 与 $H(Y)$ 之间的一般不等式关系是什么？
(a) $Y = 2X$；
(b) $Y = \\cos X$。`,
  solution: `【思路】先证一个一般结论：若 $Y = g(X)$，则 $H(X) \\ge H(Y)$，等号成立当且仅当 $g$（以概率 1）一一对应。再看 (a)(b) 中 $g$ 是否单射。

**第一步：一般结论的证明。** 设 $y = g(x)$，则

$$p(y) = \\sum_{x:\\, g(x)=y} p(x)$$

任取一个 $y$，考虑被映射到这个 $y$ 上的那一组 $x$。由于 $\\log$ 单调递增，且组内每个 $p(x) \\le \\sum_{x:\\,g(x)=y} p(x) = p(y)$，所以

$$\\sum_{x:\\,g(x)=y} p(x)\\log p(x) \\;\\le\\; \\sum_{x:\\,g(x)=y} p(x)\\log p(y) \\;=\\; p(y)\\log p(y) \\quad\\text{（逐点放缩）}$$

把这个不等式对所有 $y$ 求和（熵可以按像集分组求和）：

$$H(X) = -\\sum_y \\sum_{x:\\,g(x)=y} p(x)\\log p(x) \\;\\ge\\; -\\sum_y p(y)\\log p(y) \\;=\\; H(Y) \\quad\\text{（分组求和）}$$

等号成立当且仅当每组中 $g$ 是一一的，即 $g$ 以概率 1 是单射。

**(a)** $Y = 2X$：乘以 2 是一一映射。熵只取决于概率分布而与取值本身无关，所以 $H(X) = H(Y)$。

**(b)** $Y = \\cos X$：余弦在一般范围内不是一一的，所以只能断言 $H(X) \\ge H(Y)$；当 $\\cos$ 在 $X$ 的取值范围上单射时取等号。`
},
{
  no: 4,
  en: "Entropy of functions of a random variable",
  title: "随机变量之函数的熵",
  problem: `设 $X$ 为离散随机变量。证明：$X$ 的函数的熵不超过 $X$ 的熵（$H(g(X)) \\le H(X)$），并说明下列各步的依据：

$$H(X, g(X)) \\;(a)\\; = H(X) + H(g(X)\\,|\\,X) \\qquad (b)\\; = H(X)$$

$$H(X, g(X)) \\;(c)\\; = H(g(X)) + H(X\\,|\\,g(X)) \\qquad (d)\\; \\ge H(g(X))$$

从而 $H(g(X)) \\le H(X)$。`,
  solution: `【思路】核心只有两件事：链式法则 + 条件熵的非负性。逐步核对依据即可。

**(a)** $H(X, g(X)) = H(X) + H(g(X)\\,|\\,X)$
依据：熵的链式法则（对二元组 $(X, g(X))$ 展开）。

**(b)** $H(g(X)\\,|\\,X) = 0$，故 $H(X, g(X)) = H(X)$。
理由：给定 $X = x$ 时 $g(X)$ 完全确定，没有剩余不确定性：

$$H(g(X)\\,|\\,X) = \\sum_x p(x)\\, H(g(X)\\,|\\,X = x) = \\sum_x p(x)\\cdot 0 = 0 \\quad\\text{（确定性函数零条件熵）}$$

**(c)** $H(X, g(X)) = H(g(X)) + H(X\\,|\\,g(X))$
依据：还是链式法则，只是换了展开顺序（先展开 $g(X)$ 再展开 $X$）。

**(d)** $H(X, g(X)) \\ge H(g(X))$
依据：条件熵非负，$H(X\\,|\\,g(X)) \\ge 0$，等号成立当且仅当 $X$ 是 $g(X)$ 的函数，即 $g(\\cdot)$ 一一对应。

**合并 (b)(d)：**

$$H(X) \\;\\overset{(b)}{=}\\; H(X, g(X)) \\;\\overset{(d)}{\\ge}\\; H(g(X)) \\qquad\\Rightarrow\\qquad \\boxed{\\,H(g(X)) \\le H(X)\\,}$$

【注】直观理解：处理（做函数变换）只会丢信息、不会造信息——这正是后面数据处理不等式的雏形。`
},
{
  no: 6,
  en: "Conditional mutual information vs. unconditional mutual information",
  title: "条件互信息与无条件互信息",
  problem: `举出联合随机变量 $X, Y, Z$ 的例子，使得
(a) $I(X;Y\\,|\\,Z) < I(X;Y)$；
(b) $I(X;Y\\,|\\,Z) > I(X;Y)$。`,
  solution: `【思路】观察条件 $Z$ 之后，互信息可能变大也可能变小——两个方向各构造一个例子。

**(a) 条件使互信息变小。** 由书中定理 2.8.1 的推论：若 $X \\to Y \\to Z$ 构成马尔可夫链，则 $I(X;Y) \\ge I(X;Y\\,|\\,Z)$。取最简单的链：$X$ 为公平抛掷（0/1 等可能），$Y = X$，$Z = Y$。

$$I(X;Y) = H(X) - H(X\\,|\\,Y) = H(X) = 1 \\text{ bit}$$

$$I(X;Y\\,|\\,Z) = H(X\\,|\\,Z) - H(X\\,|\\,Y,Z) = 0 - 0 = 0 \\quad\\text{（已知 } Z \\text{ 即已知 } X\\text{）}$$

于是 $I(X;Y) > I(X;Y\\,|\\,Z)$。

**(b) 条件使互信息变大。** 取 $X, Y$ 为相互独立的公平二值随机变量，令 $Z = X \\oplus Y$（模 2 加）。

$$I(X;Y) = 0 \\quad\\text{（独立）}$$

但观察到 $Z$ 后情况完全不同：给定 $Z$，$X$ 与 $Y$ 一一绑定（$Y = X \\oplus Z$），因此

$$I(X;Y\\,|\\,Z) = H(X\\,|\\,Z) - H(X\\,|\\,Y,Z)$$

其中 $H(X\\,|\\,Y,Z) = 0$（由 $Y,Z$ 可定出 $X$）；又因为 $Y = X \\oplus Z$ 可以"抵消" $Z$ 的影响，给定 $Z$ 时 $X$ 仍均匀分布，$H(X\\,|\\,Z) = 1$ bit。故

$$I(X;Y\\,|\\,Z) = 1 \\text{ bit} > I(X;Y) = 0$$

【注】官方解答手册此处把 $I(X;Y\\,|\\,Z)$ 印作 $1/2$，手推应为 $1$ bit：给定 $Z$ 后 $X$ 仍有整整 1 比特的不确定度（此时 $Y$ 恰好把它完全揭示）。此时 $X, Y, Z$ 两两不构成马尔可夫链。`
},
{
  no: 8,
  en: "Drawing with and without replacement",
  title: "有放回与无放回抽取",
  problem: `罐中有 $r$ 个红球、$w$ 个白球、$b$ 个黑球。从罐中抽取 $k \\ge 2$ 个球：有放回抽取与无放回抽取，哪种方式的熵更大？请建立模型并证明。（这道题既有很难的做法，也有比较巧的做法。）`,
  solution: `【思路】逐次算条件分布比较麻烦；巧妙的做法是直接比较无条件熵，再用链式法则。

**有放回的情形。** 每次抽取的条件分布都相同：

$$X_i = \\begin{cases} \\text{红}, & \\text{概率 } \\dfrac{r}{r+w+b} \\\\ \\text{白}, & \\text{概率 } \\dfrac{w}{r+w+b} \\\\ \\text{黑}, & \\text{概率 } \\dfrac{b}{r+w+b} \\end{cases}$$

于是

$$H(X_i \\,|\\, X_{i-1}, \\ldots, X_1) = H(X_i) = \\log(r+w+b) - \\frac{r}{r+w+b}\\log r - \\frac{w}{r+w+b}\\log w - \\frac{b}{r+w+b}\\log b$$

**无放回的情形。** 关键观察：第 $i$ 次抽到红球的**无条件**概率仍是 $\\dfrac{r}{r+w+b}$（由对称性：每个位置对每种球的地位相同），所以无条件熵 $H(X_i)$ 与有放回时完全一样。

但无条件熵不是我们关心的量，链式法则给出

$$H(X_1, \\ldots, X_k) = \\sum_{i=1}^{k} H(X_i \\,|\\, X_{i-1}, \\ldots, X_1)$$

无放回时，前面抽走的球会提供信息，使条件熵不增：

$$H(X_i \\,|\\, X_{i-1}, \\ldots, X_1) \\le H(X_i) \\quad\\text{（条件降低熵）}$$

而其无条件分布与有放回时相同。逐项比较即得

$$H(\\text{有放回}) \\;\\ge\\; H(\\text{无放回})$$

**结论：有放回抽取的熵更大。** 直观上：不放回时，已抽出的球告诉你罐里剩什么，不确定性被"消耗"了。`
},
{
  no: 10,
  en: "Entropy of a disjoint mixture",
  title: "不相交混合的熵",
  problem: `设 $X_1, X_2$ 为离散随机变量，取值范围分别为不相交的字母表 $\\mathcal{X}_1 = \\{1, 2, \\ldots, m\\}$ 与 $\\mathcal{X}_2 = \\{m+1, \\ldots, n\\}$，分别服从分布 $p_1(\\cdot), p_2(\\cdot)$。令

$$X = \\begin{cases} X_1, & \\text{概率 } \\alpha \\\\ X_2, & \\text{概率 } 1-\\alpha \\end{cases}$$

(a) 用 $H(X_1), H(X_2)$ 与 $\\alpha$ 表示 $H(X)$；
(b) 对 $\\alpha$ 取极大值，证明 $2^{H(X)} \\le 2^{H(X_1)} + 2^{H(X_2)}$，并用"有效字母表大小"来解释。`,
  solution: `【思路】$X_1, X_2$ 值域不相交，所以"$X$ 究竟来自哪一段"是 $X$ 的确定函数——套用第 2.4 题的技巧即可。

**第一步：引入指示变量。** 定义 $\\theta = f(X)$：

$$\\theta = \\begin{cases} 1, & X \\text{ 来自 } X_1 \\\\ 2, & X \\text{ 来自 } X_2 \\end{cases}$$

**第二步：链式法则展开。**

$$H(X) = H(X, \\theta) = H(\\theta) + H(X\\,|\\,\\theta)$$

依据：链式法则；又 $\\theta$ 是 $X$ 的函数，展开顺序不影响联合熵。

**第三步：逐项计算。**

$$H(X\\,|\\,\\theta) = \\Pr\\{\\theta=1\\} H(X\\,|\\,\\theta=1) + \\Pr\\{\\theta=2\\} H(X\\,|\\,\\theta=2) = \\alpha H(X_1) + (1-\\alpha) H(X_2)$$

故

$$\\boxed{\\,H(X) = H(\\alpha) + \\alpha H(X_1) + (1-\\alpha) H(X_2)\\,} \\qquad H(\\alpha) = -\\alpha\\log\\alpha - (1-\\alpha)\\log(1-\\alpha)$$

**(b) 对 $\\alpha$ 取极大。** $H(\\alpha) \\le 1$，在 $\\alpha = 1/2$ 时取得最大，于是

$$H(X) \\;\\le\\; 1 + \\frac{H(X_1) + H(X_2)}{2}$$

两边取 $2$ 的幂：

$$2^{H(X)} \\;\\le\\; 2 \\cdot \\sqrt{2^{H(X_1)} \\cdot 2^{H(X_2)}} \\;\\le\\; 2^{H(X_1)} + 2^{H(X_2)} \\quad\\text{（均值不等式 AM–GM）}$$

**解释：** $2^{H}$ 是随机变量的"有效字母表大小"（等效的等概符号数）。上式说明：把两段不相交的分布混合后，混合变量的有效字母表大小不超过两段有效大小之和——混合不会凭空扩大字母表。`
},
{
  no: 12,
  en: "Example of joint entropy",
  title: "联合熵计算例",
  problem: `设联合分布 $p(x,y)$ 如下表：

| $p(x,y)$ | $Y=0$ | $Y=1$ |
|---|---|---|
| $X=0$ | 1/3 | 1/3 |
| $X=1$ | 0 | 1/3 |

求：(a) $H(X),\\ H(Y)$；(b) $H(X\\,|\\,Y),\\ H(Y\\,|\\,X)$；(c) $H(X,Y)$；(d) $H(Y) - H(Y\\,|\\,X)$；(e) $I(X;Y)$；(f) 画出 (a)–(e) 各量的维恩图。`,
  solution: `【思路】先求边缘分布，再逐个按定义算，最后用 $I(X;Y)$ 的多种表达互相校核。

**第一步：边缘分布。** 由表逐行、逐列相加：

$$p_X(0) = \\tfrac{1}{3}+\\tfrac{1}{3} = \\tfrac{2}{3}, \\quad p_X(1) = \\tfrac{1}{3}; \\qquad p_Y(0) = \\tfrac{1}{3}, \\quad p_Y(1) = \\tfrac{2}{3}$$

**(a) 边缘熵。**

$$H(X) = \\tfrac{2}{3}\\log\\tfrac{3}{2} + \\tfrac{1}{3}\\log 3 = \\log 3 - \\tfrac{2}{3} \\approx 1.585 - 0.667 = 0.918 \\text{ bits}$$

由对称性 $H(Y) = 0.918$ bits。

**(b) 条件熵。** 逐列（逐行）算再按边缘加权：

$Y=0$ 时 $X$ 确定（$p(1,0)=0$），$H(X\\,|\\,Y=0)=0$；$Y=1$ 时 $X$ 等可能，$H(X\\,|\\,Y=1)=1$。故

$$H(X\\,|\\,Y) = \\tfrac{1}{3}\\cdot 0 + \\tfrac{2}{3}\\cdot 1 = \\tfrac{2}{3} \\approx 0.667 \\text{ bits}$$

同理 $X=0$ 时 $Y$ 等可能、$X=1$ 时 $Y$ 确定：

$$H(Y\\,|\\,X) = \\tfrac{2}{3}\\cdot 1 + \\tfrac{1}{3}\\cdot 0 = \\tfrac{2}{3} \\approx 0.667 \\text{ bits}$$

**(c) 联合熵。** 三个非零格子各 $1/3$：

$$H(X,Y) = 3 \\times \\tfrac{1}{3}\\log 3 = \\log 3 \\approx 1.585 \\text{ bits}$$

**(d)**

$$H(Y) - H(Y\\,|\\,X) = 0.918 - 0.667 = 0.251 \\text{ bits}$$

**(e) 互信息。** 由定义 $I(X;Y) = H(Y) - H(Y\\,|\\,X) = 0.251$ bits。校核：$H(X) - H(X\\,|\\,Y) = 0.918 - 0.667 = 0.251$ ✓（两条路算出的结果一致）。

**(f) 维恩图。** 左圆 $H(X) = 0.918$，右圆 $H(Y) = 0.918$，交集 $I(X;Y) = 0.251$，左月牙 $H(X\\,|\\,Y) = 0.667$，右月牙 $H(Y\\,|\\,X) = 0.667$，并集 $H(X,Y) = 1.585$：

<div class="venn">
<svg viewBox="0 0 460 240" width="460" height="240" xmlns="http://www.w3.org/2000/svg">
  <circle cx="175" cy="120" r="85" fill="rgba(59,130,246,0.18)" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="285" cy="120" r="85" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" stroke-width="2"/>
  <text x="120" y="70" font-size="15" fill="#1d4ed8" font-weight="bold">H(X) = 0.918</text>
  <text x="128" y="125" font-size="15" fill="#1e3a8a" font-weight="bold">H(X|Y)</text>
  <text x="118" y="145" font-size="14" fill="#1e3a8a">= 0.667</text>
  <text x="230" y="115" font-size="15" fill="#374151" font-weight="bold">I(X;Y)</text>
  <text x="222" y="135" font-size="14" fill="#374151">= 0.251</text>
  <text x="308" y="125" font-size="15" fill="#92400e" font-weight="bold">H(Y|X)</text>
  <text x="308" y="145" font-size="14" fill="#92400e">= 0.667</text>
  <text x="290" y="70" font-size="15" fill="#b45309" font-weight="bold">H(Y) = 0.918</text>
  <text x="230" y="228" font-size="14" fill="#111827">H(X,Y) = 1.585 bits（两圆并集）</text>
</svg>
</div>`
},
{
  no: 14,
  en: "Entropy of a sum",
  title: "和的熵",
  problem: `设 $X, Y$ 分别取值 $x_1, \\ldots, x_r$ 与 $y_1, \\ldots, y_s$，令 $Z = X + Y$。
(a) 证明 $H(Z\\,|\\,X) = H(Y\\,|\\,X)$；并论证：若 $X, Y$ 独立，则 $H(Y) \\le H(Z)$ 且 $H(X) \\le H(Z)$，即独立随机变量相加只会增加不确定性；
(b) 举一个（必然相关的）例子，使 $H(X) > H(Z)$ 且 $H(Y) > H(Z)$；
(c) 在什么条件下 $H(Z) = H(X) + H(Y)$？`,
  solution: `**(a) 第一步：证 $H(Z\\,|\\,X) = H(Y\\,|\\,X)$。** 关键是逐点看条件分布：给定 $X = x$，事件 "$Z = z$" 与 "$Y = z - x$" 是同一件事：

$$p(Z = z \\,|\\, X = x) = p(Y = z - x \\,|\\, X = x)$$

于是（做变量替换 $z = x + y$，$z$ 跑遍值域时 $y$ 也跑遍值域）：

$$H(Z\\,|\\,X) = -\\sum_x p(x) \\sum_z p(z - x\\,|\\,x) \\log p(z - x\\,|\\,x) = \\sum_x p(x)\\, H(Y\\,|\\,X=x) = H(Y\\,|\\,X) \\;\\;\\checkmark$$

**第二步：独立时 $H(Z) \\ge H(Y)$。** 由互信息非负：

$$H(Z) \\ge H(Z\\,|\\,X) = H(Y\\,|\\,X) \\overset{\\text{独立}}{=} H(Y) \\quad\\text{（} I(X;Z) \\ge 0 \\text{）}$$

同理（$H(Z\\,|\\,Y) = H(X\\,|\\,Y) = H(X)$）得 $H(Z) \\ge H(X)$。结论：独立的两个随机变量相加，和的不确定性不小于任何一个加项——"相加添不确定性"。

**(b) 反例：强相关时和的熵可以更小。** 取

$$X = -Y = \\begin{cases} 1, & \\text{概率 } 1/2 \\\\ 0, & \\text{概率 } 1/2 \\end{cases}$$

则 $H(X) = H(Y) = 1$ bit，但 $Z = X + Y \\equiv 0$，是常量，$H(Z) = 0$。两个都有 1 比特不确定性的变量，相加后不确定性反而归零。

**(c) 等号条件。** 两步放缩：

$$H(Z) \\;\\le\\; H(X, Y) \\;\\le\\; H(X) + H(Y) \\quad\\text{（} Z \\text{ 是 } (X,Y) \\text{ 的函数；子集相加性）}$$

第一个不等号取等：$H(X,Y) = H(Z)$，即 $(X,Y)$ 是 $Z$ 的（可测）函数——知道和就能复原两个加项；
第二个不等号取等：$H(Y\\,|\\,X) = H(Y)$，即 $X, Y$ 独立。

所以 $\\boxed{H(Z) = H(X) + H(Y) \\iff (X,Y) \\text{ 可由 } Z \\text{ 复原且 } X \\perp Y}$。`
},
{
  no: 16,
  en: "Bottleneck",
  title: "瓶颈",
  problem: `设（非平稳）马尔可夫链从 $n$ 个状态之一出发，收窄到 $k < n$ 个状态，再扩展回 $m > k$ 个状态，即 $X_1 \\to X_2 \\to X_3$，其中 $x_1 \\in \\{1,\\ldots,n\\}$，$x_2 \\in \\{1,\\ldots,k\\}$，$x_3 \\in \\{1,\\ldots,m\\}$。
(a) 证明 $X_1$ 与 $X_3$ 的依赖受瓶颈限制：$I(X_1; X_3) \\le \\log k$；
(b) 对 $k = 1$ 计算 $I(X_1; X_3)$，说明这样的瓶颈会使依赖完全消失。`,
  solution: `【思路】一句话：数据流必须挤过宽度为 $k$ 的瓶颈，而 $k$ 个状态的变量最多携带 $\\log k$ 比特。

**(a)** 三步放缩，每步都有名有姓：

$$I(X_1; X_3) \\;\\le\\; I(X_1; X_2) \\quad\\text{（数据处理不等式：} X_1 \\to X_2 \\to X_3\\text{）}$$

$$I(X_1; X_2) = H(X_2) - H(X_2\\,|\\,X_1) \\;\\le\\; H(X_2) \\quad\\text{（条件熵非负）}$$

$$H(X_2) \\;\\le\\; \\log k \\quad\\text{（} k \\text{ 个状态上熵的最大值为均匀分布）}$$

串联起来：

$$\\boxed{\\,I(X_1; X_3) \\le \\log k\\,}$$

即两端 $X_1, X_3$ 之间的互信息被中间变量的状态数封顶——这就是"瓶颈"的含义。

**(b)** 取 $k = 1$：

$$I(X_1; X_3) \\le \\log 1 = 0$$

又互信息非负 $I(X_1; X_3) \\ge 0$，故 $I(X_1; X_3) = 0$，$X_1$ 与 $X_3$ 独立。

**结论：** 只要瓶颈收窄到单一状态，无论链条两端原来多么相关，依赖都无法存活——单状态中间点把信息全部抹掉。`
},
{
  no: 18,
  en: "World Series",
  title: "世界大赛",
  problem: `世界大赛是七场四胜制系列赛，一队先赢四场即终止。设 $X$ 表示甲、乙两队之间整个系列赛的结果（如 AAAA、BABABAB、BBBAAAA 等），$Y$ 为比赛场数（4 到 7）。假设两队实力相当（每场各以 1/2 获胜）且各场独立，计算 $H(X),\\ H(Y),\\ H(Y\\,|\\,X),\\ H(X\\,|\\,Y)$。`,
  solution: `【思路】先数清楚每场比赛数下有多少种系列赛、各占多少概率，其余都是套定义。

**第一步：计数。** 打满 $j \\ge 4$ 场且 A 队夺冠的序列：前 $j-1$ 场中 A 恰胜 3 场，最后一场 A 胜，共 $\\binom{j-1}{3}$ 种；两队各一套，共 $2\\binom{j-1}{3}$ 种，每个序列概率 $(1/2)^j$。

$$\\text{4 场：} 2 \\binom{3}{3} = 2 \\text{ 种} \\qquad \\text{5 场：} 2\\binom{4}{3} = 8 \\text{ 种} \\qquad \\text{6 场：} 2\\binom{5}{3} = 20 \\text{ 种} \\qquad \\text{7 场：} 2\\binom{6}{3} = 40 \\text{ 种}$$

**第二步：$Y$ 的分布。**

$$p(Y=4) = 2\\cdot\\tfrac{1}{16} = \\tfrac{1}{8}, \\quad p(Y=5) = 8\\cdot\\tfrac{1}{32} = \\tfrac{1}{4}, \\quad p(Y=6) = 20\\cdot\\tfrac{1}{64} = \\tfrac{5}{16}, \\quad p(Y=7) = 40\\cdot\\tfrac{1}{128} = \\tfrac{5}{16}$$

**第三步：逐个计算。**

$$H(X) = 2\\cdot\\tfrac{1}{16}\\log 16 + 8\\cdot\\tfrac{1}{32}\\log 32 + 20\\cdot\\tfrac{1}{64}\\log 64 + 40\\cdot\\tfrac{1}{128}\\log 128 = \\tfrac{4}{8} + \\tfrac{5}{4} + \\tfrac{30}{16} + \\tfrac{35}{16} = 5.8125 \\text{ bits}$$

（每个序列长度为 $j$，贡献 $j$ 比特：$H(X) = E[\\text{场数对应的}\\log 2^j]$。）

$$H(Y) = \\tfrac{1}{8}\\log 8 + \\tfrac{1}{4}\\log 4 + \\tfrac{5}{16}\\log\\tfrac{16}{5} + \\tfrac{5}{16}\\log\\tfrac{16}{5} = 0.375 + 0.5 + 1.049 \\approx 1.924 \\text{ bits}$$

$$H(Y\\,|\\,X) = 0 \\quad\\text{（} Y \\text{ 是 } X \\text{ 的确定函数：数一下序列长度即可）}$$

$$H(X\\,|\\,Y) = H(X) + H(Y\\,|\\,X) - H(Y) = 5.8125 - 1.924 = 3.889 \\text{ bits} \\quad\\text{（恒等式变形）}$$

【注】知道打了 7 场，仍剩约 3.9 比特关于具体胜负过程的不确定性——场数信息远不足以确定过程。`
},
{
  no: 20,
  en: "Run length coding",
  title: "游程编码",
  problem: `设 $X_1, X_2, \\ldots, X_n$ 为（可能相关的）二值随机变量。按出现顺序记录游程长度 $R = (R_1, R_2, \\ldots)$。例如序列 $X = 0001100100$ 的游程为 $R = (3, 2, 2, 1, 2)$。比较 $H(X_1, \\ldots, X_n)$、$H(R)$ 与 $H(X_i, R)$，写出全部等式与不等式，并给出各差值的界。`,
  solution: `【思路】抓住两条事实：① 游程是原序列的函数；② 任取一个 $X_i$，配上游程 $R$，就能完整复原序列。

**事实 ① ⇒ 第一个不等式。** $R$ 是 $(X_1, \\ldots, X_n)$ 的确定函数，由"函数不增熵"（第 2.4 题）：

$$H(R) \\le H(X_1, X_2, \\ldots, X_n)$$

**事实 ② ⇒ 等式。** 知道任一分量 $X_i$ 与全部游程，就能交替复原整个序列（例如知道 $X_1$ 与 $R=(3,2,2,1,2)$ 即知 $0001100100$）。也就是说 $(X_1, \\ldots, X_n)$ 与 $(X_i, R)$ 一一对应：

$$H(X_1, X_2, \\ldots, X_n) = H(X_i, R)$$

**链式法则展开：**

$$H(X_1, \\ldots, X_n) = H(X_i, R) = H(R) + H(X_i \\,|\\, R) \\;\\le\\; H(R) + H(X_i) \\;\\le\\; H(R) + 1 \\quad\\text{（二值变量 } H(X_i) \\le 1\\text{）}$$

**汇总（全部关系）：**

$$H(R) \\;\\le\\; H(X_1, \\ldots, X_n) \\;\\le\\; H(R) + 1$$

【注】差值至多 1 比特：游程编码几乎无损——它丢失的只是"序列以 0 开头还是以 1 开头"这一比特信息。`
},
{
  no: 22,
  en: "Logical order of ideas",
  title: "概念的逻辑顺序",
  problem: `按"最强的在前、被推出的在后"的逻辑顺序，重排下列概念：
(a) $I(X_1, \\ldots, X_n; Y)$ 的链式法则、$D(p(x_1, \\ldots, x_n)\\,\\|\\, q(x_1, \\ldots, x_n))$ 的链式法则、$H(X_1, X_2, \\ldots, X_n)$ 的链式法则；
(b) $D(f\\,\\|\\,g) \\ge 0$、Jensen 不等式、$I(X;Y) \\ge 0$。`,
  solution: `【思路】把每个概念看作更一般概念的特例，特例排在被推出的一侧。排序带有一定主观性，下面给出最自然的一条链。

**(a) 排序：$D$ 的链式法则 → $I$ 的链式法则 → $H$ 的链式法则。**

- $I(X;Y) = D\\big(p(x,y)\\,\\|\\,p(x)p(y)\\big)$：互信息是相对熵的特例，所以 $I$ 的链式法则可以从 $D$ 的链式法则直接推出（令 $q(x,y) = p(x)p(y)$ 逐维展开）。
- $H(X) = I(X;X)$：熵是互信息的特例，所以 $H$ 的链式法则可由 $I$ 的链式法则推出。
- 反过来教材的做法是：由 $H$ 的链式法则推出 $I$ 的链式法则（$I(X;Y) = H(X) - H(X\\,|\\,Y)$ 再展开），所以 $H \\leftrightarrow I$ 两个方向都通；但 $D$ 永远是最上游。

**(b) 排序：Jensen 不等式 → $D(f\\,\\|\\,g) \\ge 0$ → $I(X;Y) \\ge 0$。**

- Jensen 不等式（$\\log$ 的凹性：$E[\\log t] \\le \\log E[t]$）是最原始的分析工具；
- 用它立得 $-D(p\\,\\|\\,q) = \\sum p \\log(q/p) \\le \\log \\sum q \\le 0$，即 $D \\ge 0$；
- $I(X;Y) = D(p(x,y)\\,\\|\\,p(x)p(y))$ 是 $D$ 的特例，非负性随之而来。

**一句话：$D$（Jensen）是一切之母，$I$、$H$ 都是它的特例或推论。**`
},
{
  no: 24,
  en: "Average entropy",
  title: "平均熵",
  problem: `设 $H(p) = -p\\log_2 p - (1-p)\\log_2(1-p)$ 为二元熵函数。
(a) 利用 $\\log_2 3 \\approx 1.584$ 计算 $H(1/4)$。提示：考虑一个有四个等可能结果的实验，其中一个结果比其他"更有趣"；
(b) 若 $p$ 在 $[0,1]$ 上均匀取值，求平均熵 $E[H(p)]$；
(c)（选做）$(p_1, p_2, p_3)$ 在概率向量集合上均匀分布，求平均 $H(p_1,p_2,p_3)$，并推广到 $n$ 维。`,
  solution: `**(a) 分步提问法。** 四选一等概的实验蕴含 2 比特。把选择拆成两步：

第一步：先问"是不是第 1 个结果"。此事件概率 $1/4$，产生 $H(1/4)$ 比特；
第二步：若不是（概率 $3/4$），再在剩下 3 个等可能结果中选择，产生 $\\log_2 3$ 比特。

信息量按步骤加权求和应当等于总量：

$$H(1/4) + \\tfrac{3}{4}\\log_2 3 = 2$$

解出：

$$\\boxed{\\,H(1/4) = 2 - \\tfrac{3}{4}\\log_2 3 = 2 - 0.75 \\times 1.585 = 0.811 \\text{ bits}\\,}$$

这就是"分组公式" $H_4(\\tfrac14,\\tfrac14,\\tfrac14,\\tfrac14) = H(\\tfrac14) + \\tfrac34 H_3(\\tfrac13,\\tfrac13,\\tfrac13)$ 的直接应用。

**(b) $p$ 均匀时的平均熵。** 用自然对数积分（对称性：两项积分相等，记 $x = p$）：

$$E[H(p)] = -\\int_0^1 \\big[p\\ln p + (1-p)\\ln(1-p)\\big]\\,dp = -2\\int_0^1 x\\ln x\\,dx$$

分部积分：

$$\\int_0^1 x \\ln x \\, dx = \\Big[\\frac{x^2}{2}\\ln x - \\frac{x^2}{4}\\Big]_0^1 = -\\frac{1}{4} \\qquad \\Rightarrow \\qquad E[H(p)] = \\frac{1}{2} \\text{ nats}$$

换算成比特：

$$\\boxed{\\,E[H(p)] = \\tfrac{1}{2}\\log_2 e = \\frac{1}{2\\ln 2} \\approx 0.721 \\text{ bits}\\,}$$

**(c) 三元情形。** $(p_1, p_2, p_3)$ 均匀分布等价于点 $(p_1, p_2)$ 在三角形 $0 \\le p_1 \\le 1,\\ 0 \\le p_2 \\le 1-p_1$ 上均匀取点；三角形面积 $1/2$，故密度为常数 $2$。积分（"令人愉快的微积分"，用 $\\int_0^1 u\\ln u\\,du = -1/4$ 逐项处理）得

$$E[H(p_1,p_2,p_3)] = \\frac{5}{6\\ln 2} \\approx 1.202 \\text{ bits}$$

**推广到 $n$ 维：** 结果为

$$E[H_n] = \\frac{1}{\\ln 2}\\left(\\frac{1}{2} + \\frac{1}{3} + \\cdots + \\frac{1}{n}\\right) = \\frac{H_n^{\\text{(调和)}} - 1}{\\ln 2} \\text{ bits}$$

验证：$n = 2$ 时 $\\frac{1}{2\\ln 2} \\approx 0.721$ ✓；$n = 3$ 时 $\\frac{1}{\\ln 2}(\\frac12+\\frac13) = \\frac{5}{6\\ln 2} \\approx 1.202$ ✓。`
},
{
  no: 26,
  en: "Another proof of non-negativity of relative entropy",
  title: "相对熵非负性的另一证明",
  problem: `鉴于 $D(p\\,\\|\\,q) \\ge 0$ 的基础地位，这里给出另一个证明。
(a) 证明对 $0 < x < \\infty$ 有 $\\ln x \\le x - 1$；
(b) 说明下列步骤的依据：

$$-D(p\\,\\|\\,q) = \\sum_x p(x) \\ln \\frac{q(x)}{p(x)} \\;\\le\\; \\sum_x p(x)\\Big(\\frac{q(x)}{p(x)} - 1\\Big) \\;\\le\\; 0$$

(c) 等号成立的条件是什么？`,
  solution: `**(a) 证明 $\\ln x \\le x - 1$。** 最省事的办法是微积分。令

$$f(x) = x - 1 - \\ln x$$

求导：$f'(x) = 1 - \\dfrac{1}{x}$，$f''(x) = \\dfrac{1}{x^2} > 0$，故 $f$ 严格凸，驻点即全局最小点。令 $f'(x) = 0$ 得 $x = 1$，于是

$$x - 1 - \\ln x \\;\\ge\\; f(1) = 0 \\qquad \\Rightarrow \\qquad \\ln x \\le x - 1$$

等号当且仅当 $x = 1$。（从图像上看：曲线 $\\ln x$ 永远在它的切线 $y = x - 1$ 下方。）

**(b) 逐步核对依据。** 记 $A = \\{x : p(x) > 0\\}$：

$$-D(p\\,\\|\\,q) = \\sum_{x \\in A} p(x) \\ln \\frac{q(x)}{p(x)} \\quad\\text{（第一步：相对熵的定义，负号提出）}$$

$$\\le \\sum_{x \\in A} p(x)\\Big(\\frac{q(x)}{p(x)} - 1\\Big) \\quad\\text{（第二步：} \\ln t \\le t - 1 \\text{，取 } t = q(x)/p(x) > 0\\text{）}$$

$$= \\sum_{x \\in A} q(x) - \\sum_{x \\in A} p(x) \\quad\\text{（第三步：展开整理）}$$

$$\\le 0 \\quad\\text{（第四步：}\\sum_{x \\in A} p(x) = 1\\text{，而 } \\sum_{x\\in A} q(x) \\le \\sum_{\\text{全体}} q(x) = 1\\text{）}$$

故 $D(p\\,\\|\\,q) \\ge 0$。

**(c) 等号条件。** 第二步的 $\\ln t \\le t - 1$ 仅在 $t = 1$ 处取等，因此要求

$$\\frac{q(x)}{p(x)} = 1 \\quad \\forall x \\in A \\qquad \\Longleftrightarrow \\qquad p(x) = q(x) \\ \\ \\forall x$$

此时第四步也自动取等（$q(A) = 1$）。**结论：$D(p\\,\\|\\,q) = 0 \\iff p = q$（逐点相等）。**`
},
{
  no: 28,
  en: "Mixing increases entropy",
  title: "混合使熵增加",
  problem: `证明：分布 $(p_1, \\ldots, p_i, \\ldots, p_j, \\ldots, p_m)$ 的熵小于把第 $i, j$ 个分量都换成 $\\dfrac{p_i + p_j}{2}$ 后的分布的熵。进一步证明：一般地，任何使分布更均匀的概率转移都会使熵增加。`,
  solution: `【思路】核心工具是 log-sum 不等式（其本身由 $\\ln x \\le x-1$ 或 Jensen 得来）：

$$a\\log\\frac{a}{b} + c\\log\\frac{c}{d} \\;\\ge\\; (a+c)\\log\\frac{a+c}{b+d}$$

**第一步：两分量平均化。** 设

$$P_1 = (p_1, \\ldots, p_i, \\ldots, p_j, \\ldots, p_m), \\qquad P_2 = \\Big(p_1, \\ldots, \\frac{p_i+p_j}{2}, \\ldots, \\frac{p_i+p_j}{2}, \\ldots, p_m\\Big)$$

只有第 $i, j$ 两个位置变了，其余项的 $-p\\log p$ 不变。故熵差为

$$H(P_2) - H(P_1) = -2\\cdot\\frac{p_i+p_j}{2}\\log\\frac{p_i+p_j}{2} + p_i\\log p_i + p_j\\log p_j$$

把右端整理成 log-sum 不等式的形状：令 $a = p_i,\\ b = c = d = \\dfrac{p_i+p_j}{2}$（$c = p_j$ 同理），则

$$p_i\\log\\frac{p_i}{(p_i+p_j)/2} + p_j\\log\\frac{p_j}{(p_i+p_j)/2} \\;\\ge\\; (p_i+p_j)\\log\\frac{p_i+p_j}{p_i+p_j} = 0 \\quad\\text{（log-sum 不等式）}$$

即

$$H(P_2) - H(P_1) \\;\\ge\\; 0 \\qquad\\Rightarrow\\qquad \\boxed{\\,H(P_2) \\ge H(P_1)\\,}$$

**第二步：一般的"均匀化转移"。** 设转移 $\\delta$ 把概率从较大的 $p_j$ 挪到较小的 $p_i$（$p_i \\le p_j$，$0 < \\delta \\le \\frac{p_j - p_i}{2}$），使两者更接近。可以把这一步转移分解为若干次"逐对取平均"式的两两混合步骤的极限：每次这样的 Robin Hood 式转移都不减熵（第一步结论 + 对称性 + 凸组合论证），故

$$H \\text{ 随分布被均匀化而单调不减}$$

换个角度说：熵是分布的凹对称函数，因而是 Schur-凹的——若分布 $P_2$ 比 $P_1$ 更均匀（$P_1$ 可由 $P_2$ 经有限次"由大到小转移概率"得到，即 $P_1$ 被 $P_2$ 优胜控制 / majorized），则 $H(P_2) \\ge H(P_1)$。最均匀的分布（均匀分布）熵最大，最不均匀的（退化分布）熵为 0。`
},
{
  no: 30,
  en: "Maximum entropy",
  title: "最大熵分布",
  problem: `求非负整数值随机变量 $X$ 在约束 $E[X] = \\sum_{n=0}^{\\infty} n\\,p(n) = A$（$A > 0$ 固定）下使熵 $H(X)$ 最大的概率质量函数 $p(x)$，并求此最大熵的值。`,
  solution: `【思路】不用拉格朗日乘子硬算，而用"对照组"技巧：构造一族分布 $q_i$，由 $D(p\\|q) \\ge 0$ 得上界，再让 $p$ 取成 $q$ 使等号成立。

**第一步：构造对照组。** 由相对熵非负：

$$-\\sum_{i=0}^{\\infty} p_i \\log p_i \\;\\le\\; -\\sum_{i=0}^{\\infty} p_i \\log q_i \\quad\\text{（} D(p\\|q) \\ge 0 \\text{）}$$

取几何形状的 $q_i = \\alpha\\beta^i$（$0 < \\beta < 1$），则右端与 $p$ 无关：

$$-\\sum_i p_i \\log(\\alpha\\beta^i) = -\\log\\alpha \\underbrace{\\sum_i p_i}_{=1} - \\log\\beta \\underbrace{\\sum_i i\\, p_i}_{=A} = -\\log\\alpha - A\\log\\beta$$

**第二步：用约束定出 $\\alpha, \\beta$。** 要求 $q$ 自身也是合法分布且均值恰好为 $A$：

$$\\sum_{i=0}^{\\infty} \\alpha\\beta^i = \\frac{\\alpha}{1-\\beta} = 1 \\qquad \\sum_{i=0}^{\\infty} i\\,\\alpha\\beta^i = \\frac{\\alpha\\beta}{(1-\\beta)^2} = A$$

两式相除：

$$\\frac{\\beta}{1-\\beta} = A \\qquad \\Rightarrow \\qquad \\beta = \\frac{A}{A+1}, \\qquad \\alpha = \\frac{1}{A+1}$$

**第三步：写出最大熵分布与最大值。** 当 $p = q$ 时等号成立，故最大熵分布为几何分布：

$$\\boxed{\\,p_i = \\frac{1}{A+1}\\Big(\\frac{A}{A+1}\\Big)^i, \\quad i = 0, 1, 2, \\ldots\\,}$$

代入上界表达式：

$$H(X)_{\\max} = -\\log\\alpha - A\\log\\beta = \\log(A+1) + A\\log\\frac{A+1}{A}$$

$$\\boxed{\\,H(X)_{\\max} = (A+1)\\log(A+1) - A\\log A\\,}$$

【注】若一定要走拉格朗日乘子：对 $-\\sum p_i\\log p_i + \\lambda_1(\\sum p_i - 1) + \\lambda_2(\\sum i p_i - A)$ 求偏导同样得 $p_i \\propto \\beta^i$；还需说明 $-H(p)$ 是凸函数、驻点即全局最大，方能闭环。`
},
{
  no: 32,
  en: "Fano",
  title: "Fano 界的计算例",
  problem: `设 $(X, Y)$ 的联合分布如下（$Y \\in \\{a,b,c\\}$ 为列，$X \\in \\{1,2,3\\}$ 为行）：

| | $Y=a$ | $Y=b$ | $Y=c$ |
|---|---|---|---|
| $X=1$ | 1/6 | 1/12 | 1/12 |
| $X=2$ | 1/12 | 1/6 | 1/12 |
| $X=3$ | 1/12 | 1/12 | 1/6 |

设 $\\hat{X}(Y)$ 是基于 $Y$ 对 $X$ 的估计器，$P_e = \\Pr\\{\\hat{X}(Y) \\ne X\\}$。
(a) 求最小错误概率估计器 $\\hat{X}(Y)$ 及相应的 $P_e$；
(b) 对本题计算 Fano 不等式的界，并与 $P_e$ 比较。`,
  solution: `**(a) 最小错误估计器 = 最大后验估计。** 对每个 $Y$ 的取值，挑条件概率最大的 $X$：对角线元素 $1/6$ 恒大于非对角线 $1/12$，故

$$\\hat{X}(y) = \\begin{cases} 1, & y = a \\\\ 2, & y = b \\\\ 3, & y = c \\end{cases}$$

错误发生在六个非对角格子上：

$$P_e = 6 \\times \\frac{1}{12} = \\frac{1}{2}$$

**(b) Fano 不等式。** 先算 $H(X\\,|\\,Y)$：由表格对称性，给定任一 $Y$（如 $Y=a$），$X$ 的条件分布为 $(\\tfrac16, \\tfrac1{12}, \\tfrac1{12})$，归一化后是 $(\\tfrac12, \\tfrac14, \\tfrac14)$，且三种情形完全相同：

$$H(X\\,|\\,Y) = H\\Big(\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{4}\\Big) \\cdot \\big[\\Pr(Y{=}a)+\\Pr(Y{=}b)+\\Pr(Y{=}c)\\big] = \\Big(\\tfrac12 + \\tfrac12\\Big) = 1.5 \\text{ bits}$$

（其中 $H(\\tfrac12,\\tfrac14,\\tfrac14) = \\tfrac12\\log 2 + \\tfrac12\\log 4 \\cdot \\tfrac14 \\times 2 = 1.5$，即 $\\tfrac12\\cdot 1 + 2\\cdot\\tfrac14\\cdot 2 = 1.5$。）

代入 Fano 不等式（$|\\mathcal{X}| = 3$）：

$$P_e \\;\\ge\\; \\frac{H(X\\,|\\,Y) - 1}{\\log|\\mathcal{X}|} = \\frac{1.5 - 1}{\\log 3} = \\frac{0.5}{1.585} \\approx 0.316$$

这个界离 $P_e = 0.5$ 还比较远。由于 $\\hat{X} \\in \\mathcal{X}$（估计值落在字母表内），可用**加强形式**：

$$P_e \\;\\ge\\; \\frac{H(X\\,|\\,Y) - 1}{\\log(|\\mathcal{X}| - 1)} = \\frac{0.5}{\\log 2} = \\frac{1}{2} \\;\\;\\checkmark$$

加强形式的界恰好达到 $P_e = 1/2$，说明此估计器紧贴下界——Fano 不等式在此例上是紧的。`
},
{
  no: 34,
  en: "Entropy of initial conditions",
  title: "初始条件之熵",
  problem: `证明：对任何马尔可夫链，$H(X_0 \\,|\\, X_n)$ 随 $n$ 单调不减。`,
  solution: `【思路】把"条件熵不减"翻译成互信息语言，就是数据处理不等式的一句话推论。

**第一步：套数据处理不等式。** 马尔可夫链 $X_0 \\to X_{n-1} \\to X_n$ 中，$X_{n-1}$ 介于 $X_0$ 与 $X_n$ 之间，由数据处理不等式：

$$I(X_0; X_{n-1}) \\;\\ge\\; I(X_0; X_n) \\quad\\text{（信息经过处理只会变少）}$$

**第二步：翻译成条件熵。** 用 $I(X_0; X_n) = H(X_0) - H(X_0\\,|\\,X_n)$：

$$H(X_0) - H(X_0\\,|\\,X_{n-1}) \\;\\ge\\; H(X_0) - H(X_0\\,|\\,X_n)$$

两边的 $H(X_0)$ 消去：

$$H(X_0\\,|\\,X_n) \\;\\ge\\; H(X_0\\,|\\,X_{n-1})$$

即 $\\boxed{H(X_0\\,|\\,X_n) \\text{ 随 } n \\text{ 单调不减}}$。

**直观解释：** 链条越长，信息被逐级"稀释"，终点 $X_n$ 里保留的关于起点 $X_0$ 的信息越来越少，因此"看完终点后对起点还剩的不确定度"越来越大。特别地，对平稳遍历链，$H(X_0\\,|\\,X_n) \\to H(X_0)$：起点被彻底遗忘。`
},
{
  no: 36,
  en: "Symmetric relative entropy",
  title: "对称的相对熵",
  problem: `虽然上一题表明一般 $D(p\\,\\|\\,q) \\ne D(q\\,\\|\\,p)$，但也可能存在使两者相等的分布。举一个二元字母表上 $p \\ne q$ 且 $D(p\\,\\|\\,q) = D(q\\,\\|\\,p)$ 的例子。`,
  solution: `【思路】设 $p = (p, 1-p)$，$q = (q, 1-q)$，先写出相等条件，再找一个非平凡解。

**第一步：写出条件。**

$$D(p\\,\\|\\,q) = p\\log\\frac{p}{q} + (1-p)\\log\\frac{1-p}{1-q} \\;\\overset{?}{=}\\; q\\log\\frac{q}{p} + (1-q)\\log\\frac{1-q}{1-p} = D(q\\,\\|\\,p)$$

**第二步：找解。** 取 $q = 1 - p$（即两个分布互为"翻转"），例如 $p = (\\tfrac{2}{3}, \\tfrac{1}{3})$，$q = (\\tfrac{1}{3}, \\tfrac{2}{3})$。验证：

$$D(p\\,\\|\\,q) = \\tfrac{2}{3}\\log\\frac{2/3}{1/3} + \\tfrac{1}{3}\\log\\frac{1/3}{2/3} = \\tfrac{2}{3}\\log 2 + \\tfrac{1}{3}\\log\\tfrac{1}{2} = \\Big(\\tfrac{2}{3} - \\tfrac{1}{3}\\Big)\\log 2 = \\tfrac{1}{3}\\log 2$$

$$D(q\\,\\|\\,p) = \\tfrac{1}{3}\\log\\tfrac{1}{2} + \\tfrac{2}{3}\\log 2 = \\tfrac{1}{3}\\log 2 \\;\\;\\checkmark$$

两项恰好交换位置，和不变。原因：此时 $D(p\\|q) = (2p-1)\\log\\dfrac{p}{1-p}$ 关于 $p \\leftrightarrow 1-p$（即 $p \\leftrightarrow q$）对称。

**结论：** $p = (\\tfrac23, \\tfrac13),\\ q = (\\tfrac13, \\tfrac23)$ 是一个 $p \\ne q$ 且 $D(p\\,\\|\\,q) = D(q\\,\\|\\,p) = \\tfrac13\\log 2$ 的例子。`
},
{
  no: 38,
  en: "The value of a question",
  title: "一个问题的价值",
  problem: `设 $X \\sim p(x)$，$x = 1, 2, \\ldots, m$。给定集合 $S \\subseteq \\{1, 2, \\ldots, m\\}$，提问"$X \\in S$ 吗？"并得到答案

$$Y = \\begin{cases} 1, & X \\in S \\\\ 0, & X \\notin S \\end{cases}$$

设 $\\Pr\\{X \\in S\\} = \\alpha$。求不确定度的减少量 $H(X) - H(X\\,|\\,Y)$。`,
  solution: `【思路】"不确定度减少量"就是互信息；而答案 $Y$ 是 $X$ 的确定函数，一切可算。

**第一步：识别互信息。**

$$H(X) - H(X\\,|\\,Y) = I(X;Y) \\quad\\text{（定义）}$$

**第二步：换成从 $Y$ 一侧算。** 回答"是/否"只提供关于 $Y$ 的信息，且 $Y$ 由 $X$ 完全确定：

$$I(X;Y) = H(Y) - H(Y\\,|\\,X) = H(Y) - 0 = H(Y) \\quad\\text{（} H(Y\\,|\\,X) = 0\\text{：答案由 } X \\text{ 确定）}$$

**第三步：算出 $H(Y)$。** $Y$ 是二值变量，$\\Pr\\{Y = 1\\} = \\alpha$：

$$H(Y) = H(\\alpha) = -\\alpha\\log\\alpha - (1-\\alpha)\\log(1-\\alpha)$$

**结论：**

$$\\boxed{\\,H(X) - H(X\\,|\\,Y) = H(\\alpha)\\,}$$

**解释：** 问题的价值只取决于 $\\alpha$，与 $S$ 里具体装了哪些元素、多大无关——" Apparently 任何 $\\alpha$ 相同的集合一样好"。$\\alpha = 1/2$ 时问题最值钱（1 比特），$\\alpha \\to 0$ 或 $1$ 时问题几乎白问。`
},
{
  no: 40,
  en: "Discrete entropies",
  title: "离散熵的计算",
  problem: `设 $X, Y$ 为相互独立的取整数值随机变量：$X$ 均匀分布于 $\\{1, 2, \\ldots, 8\\}$；$\\Pr\\{Y = k\\} = 2^{-k},\\ k = 1, 2, 3, \\ldots$。
(a) 求 $H(X)$；
(b) 求 $H(Y)$；
(c) 求 $H(X+Y,\\ X-Y)$。`,
  solution: `**(a)** 均匀分布的熵：

$$H(X) = \\log m = \\log_2 8 = 3 \\text{ bits}$$

**(b)** $Y$ 服从参数 $1/2$ 的几何分布。熵逐项求和，其中 $\\log\\dfrac{1}{p(k)} = \\log 2^k = k$：

$$H(Y) = \\sum_{k=1}^{\\infty} 2^{-k} \\log 2^k = \\sum_{k=1}^{\\infty} k\\, 2^{-k}$$

用错位相减法算这个级数：设 $S = \\sum_{k\\ge1} k/2^k$，则 $2S = \\sum_{k\\ge1} k/2^{k-1}$，相减得 $S = \\sum_{k\\ge1} 1/2^k = 1$，故

$$\\boxed{\\,H(Y) = 2 \\text{ bits}\\,}$$

（这正是第 2.1 题的结论：几何分布的熵等于它的均值，$E[Y] = 2$。）

**(c)** 关键观察：变换 $(X, Y) \\mapsto (X+Y,\\ X-Y)$ 是一一对应的——反解即得 $X = \\frac{(X+Y)+(X-Y)}{2}$，$Y = \\frac{(X+Y)-(X-Y)}{2}$。可逆变换不改变熵（第 2.2 题结论），再用独立性：

$$H(X+Y,\\ X-Y) = H(X, Y) = H(X) + H(Y) = 3 + 2 = \\boxed{5 \\text{ bits}}$$

【注】两个量 $(X+Y)$、$(X-Y)$ 单独看都不是均匀分布，但把它们捆在一起看，信息量一点没丢。`
},
{
  no: 42,
  en: "Inequalities",
  title: "不等式判断",
  problem: `下列各对量之间的一般关系是 $\\ge$、$=$ 还是 $\\le$？逐条标出：
(a) $H(5X)$ 与 $H(X)$；
(b) $I(g(X); Y)$ 与 $I(X; Y)$；
(c) $H(X_0\\,|\\,X_{-1})$ 与 $H(X_0\\,|\\,X_{-1}, X_1)$；
(d) $H(X_1, \\ldots, X_n)$ 与 $H(c(X_1, \\ldots, X_n))$，其中 $c(\\cdot)$ 是分配给 $(x_1, \\ldots, x_n)$ 的 Huffman 码字；
(e) $\\dfrac{H(X,Y)}{H(X) + H(Y)}$ 与 $1$。`,
  solution: `**(a) $H(5X) = H(X)$。** $X \\mapsto 5X$ 是一一映射，而熵只与概率分布有关、与取值数值无关（见第 2.2 题）。

**(b) $I(g(X); Y) \\le I(X; Y)$。** $X \\to g(X) \\to$（与 $Y$ 配对）构成数据处理链：$g(X)$ 是 $X$ 的函数，处理只会丢信息。

**(c) $H(X_0\\,|\\,X_{-1}) \\ge H(X_0\\,|\\,X_{-1}, X_1)$。** 条件降低熵：多给一个条件变量 $X_1$，不确定度只会更小（或不变）。

**(d) $H(X_1, \\ldots, X_n) \\ge H(c(X_1, \\ldots, X_n))$。** 码字 $c(\\cdot)$ 是序列的确定函数（给定序列，Huffman 编码结果唯一），"函数不增熵"直接适用：压缩编码的输出熵不超过源序列熵。

**(e) $\\dfrac{H(X,Y)}{H(X) + H(Y)} \\le 1$。** 由子集相加性 $H(X, Y) \\le H(X) + H(Y)$，分母不为零时即得。

【小结】全部判定只用了三件兵器：① 函数（可逆与否）对熵的影响；② 数据处理不等式；③ 条件降低熵 / 子集相加性。`
},
{
  no: 44,
  en: "Pure randomness",
  title: "从不均匀三面硬币产生公平比特",
  problem: `想用一枚"三面"硬币产生公平抛掷。硬币 $X$ 的分布为

$$X = \\begin{cases} A, & p_A \\\\ B, & p_B \\\\ C, & p_C \\end{cases}$$

其中 $p_A, p_B, p_C$ 未知。
(a) 如何用两次独立投掷 $X_1, X_2$ 产生（若可能）$\\text{Bernoulli}(1/2)$ 随机变量 $Z$？
(b) 该方案能产生的（最大）期望公平比特数是多少？`,
  solution: `【思路】突破口：$p_A p_B = p_B p_A$——交换两个字母不改变概率！成对出现的不对称序列天然等概。

**(a) 方案。** 两次投掷得到 $XY$，观察其是否为"两字母不同"：

$$Z = \\begin{cases} 0, & X_1X_2 \\in \\{AB,\\ BC,\\ AC\\} \\\\ 1, & X_1X_2 \\in \\{BA,\\ CB,\\ CA\\} \\\\ \\text{不输出}, & X_1X_2 \\in \\{AA,\\ BB,\\ CC\\} \\end{cases}$$

**验证 $Z$ 是公平的：** 例如

$$\\Pr\\{AB\\} = p_A p_B = p_B p_A = \\Pr\\{BA\\}$$

因此

$$\\Pr\\{Z=0\\} = p_Ap_B + p_Bp_C + p_Ap_C = \\Pr\\{Z=1\\}$$

两边各为 $\\dfrac{1 - p_A^2 - p_B^2 - p_C^2}{2}$，且与未知的 $p_A, p_B, p_C$ 的具体取值无关——完美公平。$AA/BB/CC$ 出现时舍弃（本轮不产出比特）。

**(b) 期望比特数。** 除两次投掷结果相同外，每轮恰好产出 1 个公平比特：

$$E[\\text{比特数}] = 0 \\cdot \\big[p_A^2 + p_B^2 + p_C^2\\big] + 1 \\cdot \\big[1 - p_A^2 - p_B^2 - p_C^2\\big]$$

$$\\boxed{\\,= 1 - p_A^2 - p_B^2 - p_C^2\\,}$$

【注】这与第 2.17 题（弯硬币产生随机比特）的思想一致：利用对称性，从非均匀源中"榨取"均匀比特。硬币越均匀（$p$ 越接近 $1/3$），产出率越高。`
},
{
  no: 46,
  en: "Axiomatic definition of entropy",
  title: "熵的公理化定义",
  problem: `如果对"信息量"的度量施加某些公理，就会被迫使用对数型的度量——熵。设对称函数列 $H_m(p_1, p_2, \\ldots, p_m)$ 满足：
• 归一化：$H_2\\big(\\tfrac12, \\tfrac12\\big) = 1$；
• 连续性：$H_2(p, 1-p)$ 关于 $p$ 连续；
• 分组：$H_m(p_1, p_2, \\ldots, p_m) = H_{m-1}(p_1+p_2, p_3, \\ldots, p_m) + (p_1+p_2)\\, H_2\\big(\\tfrac{p_1}{p_1+p_2}, \\tfrac{p_2}{p_1+p_2}\\big)$。
证明：$H_m$ 必然形如 $H_m(p_1, \\ldots, p_m) = -\\sum_{i=1}^m p_i \\log p_i$。`,
  solution: `【思路】这是本章最难的一题（Rényi 证明）。证明路线图：① 把分组公理"扩展"；② 证明均匀分布熵 $f(m)$ 满足 $f(mn) = f(m) + f(n)$，从而 $f(m) = \\log_2 m$；③ 对有理数 $p$ 算出 $H_2$，用连续性推广到无理数；④ 归纳推广到 $H_m$。

**第一步：扩展分组公理。** 反复使用分组公理（记 $S_k = \\sum_{i=1}^k p_i$，$h(q) = H_2(q, 1-q)$），可归纳地合并任意前 $k$ 项：

$$H_m(p_1, \\ldots, p_m) = H_{m-k}(S_k, p_{k+1}, \\ldots, p_m) + S_k\\, H_k\\Big(\\frac{p_1}{S_k}, \\ldots, \\frac{p_k}{S_k}\\Big)$$

（对 $k$ 归纳：每次把前 $k$ 项视为一组继续与下一项合并；再对 $H_k(p_1/S_k,\\ldots,p_k/S_k)$ 反向展开，两边消去公共项即得。对称性保证可以合并**任意**一组分量，而不只是开头连续段。）

**第二步：$f(mn) = f(m) + f(n)$。** 记 $f(m) = H_m(\\tfrac1m, \\ldots, \\tfrac1m)$。把 $mn$ 个等概符号按每 $n$ 个分成 $m$ 组，用扩展分组公理逐组合并：

$$f(mn) = H_m\\big(\\tfrac1m, \\ldots, \\tfrac1m\\big) + m \\cdot \\tfrac1m H_n\\big(\\tfrac1n, \\ldots, \\tfrac1n\\big) = f(m) + f(n) \\;\\;\\checkmark$$

**第三步：补两个小引理。**
(1) $h(1) = H_2(1,0) = 0$：把 $H_3(p_1, p_2, 0)$（$p_1 + p_2 = 1$）用分组公理按两种方式展开：

$$H_2(p_1,p_2) + p_2 H_2(1,0) = H_2(1,0) + (p_1+p_2) H_2(p_1,p_2) \\;\\Rightarrow\\; p_2 H_2(1,0) = H_2(1,0) \\;\\Rightarrow\\; H_2(1,0) = 0$$

(2) $f(n+1) - f(n) \\to 0$：对 $n+1$ 个等概符号先合并出 $\\tfrac{1}{n+1}$ 与其余 $n$ 个：

$$f(n+1) = h\\Big(\\frac{1}{n+1}\\Big) + \\frac{n}{n+1} f(n)$$

由 $H_2$ 的连续性，$h(\\tfrac{1}{n+1}) \\to h(0) = 0$；再通过 $a_{n+1} := f(n+1) - f(n)$ 的递推关系与平均化论证（$\\sum n b_n$ 与 $\\sum a_n$ 的关系，$b_n = h(\\tfrac1n) \\to 0$），得 $a_{n+1} \\to 0$。

**第四步：解出 $f(m) = \\log_2 m$。** 引理：若 $f$ 满足 $f(mn) = f(m)+f(n)$、$f(n+1)-f(n) \\to 0$、$f(2) = 1$，则 $f(m) = \\log_2 m$。

证法：对任意素数 $P$，令 $g(n) = f(n) - \\dfrac{f(P)}{\\log_2 P}\\log_2 n$，则 $g(Pn) = g(n)$（可加性），且 $g(n+1)-g(n) \\to 0$。反复用 $n^{(k)} = \\lfloor n^{(k-1)}/P \\rfloor$ 归约：$g(n) = \\sum \\alpha_i$，项数至多 $P\\big(\\frac{\\log n}{\\log P} + 1\\big) = o(\\log_2 n)$ 项，每项 $\\to 0$，故 $g(n)/\\log_2 n \\to 0$，即

$$\\frac{f(n)}{\\log_2 n} = \\frac{f(P)}{\\log_2 P} \\quad \\forall n$$

由 $P$ 任意，得 $f(n) = c\\log_2 n$；再由 $f(2) = 1$ 定出 $c = 1$。素数分解 + 可加性把结论推广到一切正整数：

$$f(m) = \\log_2 m \\;\\;\\checkmark$$

**第五步：对有理数 $p$ 验证 $H_2$。** 设 $p = r/s$。对 $s$ 个等概符号使用扩展分组公理，把前 $r$ 个合并为一组、后 $s-r$ 个合并为另一组：

$$\\log_2 s = f(s) = H_2\\Big(\\frac{r}{s}, \\frac{s-r}{s}\\Big) + \\frac{r}{s} f(s-r) + \\frac{s-r}{s} f(s)$$

（其中分组后再各自展开到单符号层面：$\\frac{r}{s}f(s-r)$ 对应 $r$ 个 $\\tfrac1s$ 符号合并成一组的熵。）解出：

$$H_2\\Big(\\frac{r}{s}, \\frac{s-r}{s}\\Big) = -\\frac{r}{s}\\log_2\\frac{r}{s} - \\Big(1-\\frac{r}{s}\\Big)\\log_2\\Big(1-\\frac{r}{s}\\Big) \\;\\;\\checkmark$$

由连续性，该等式对一切（无理）$p \\in [0,1]$ 也成立。

**第六步：归纳推广到 $H_m$。** $m = 2$ 已证。设对 $m - 1$ 成立，则由分组公理：

$$H_m(p_1, \\ldots, p_m) = \\underbrace{-(p_1+p_2)\\log(p_1+p_2) - \\sum_{i=3}^m p_i \\log p_i}_{\\text{归纳假设用于 } (p_1+p_2, p_3, \\ldots, p_m)} + (p_1+p_2) h\\Big(\\frac{p_1}{p_1+p_2}\\Big)$$

展开最后一项（$h$ 已有显式表达式）：

$$h\\Big(\\frac{p_1}{p_1+p_2}\\Big) = -\\frac{p_1}{p_1+p_2}\\log\\frac{p_1}{p_1+p_2} - \\frac{p_2}{p_1+p_2}\\log\\frac{p_2}{p_1+p_2}$$

代入整理，交叉项 $\\pm(p_1+p_2)\\log(p_1+p_2)$ 恰好相消：

$$H_m(p_1, \\ldots, p_m) = -\\sum_{i=1}^m p_i \\log p_i \\;\\;\\checkmark$$

**结论：满足归一化、连续性、分组（加上对称性）公理的函数唯一，就是香农熵 $-\\sum_i p_i \\log p_i$。** 证明出自 Rényi。`
},
{
  no: 48,
  en: "Sequence length",
  title: "序列长度与序列内容",
  problem: `序列的长度包含多少关于序列内容的信息？考虑 $\\text{Bernoulli}(1/2)$ 过程 $\\{X_i\\}$，在第一次出现 1 时停止，$N$ 为停止时刻，$X^N$ 表示到停止为止的有限长序列（属于 $\\{0,1\\}^* = \\{0, 1, 00, 01, \\ldots\\}$）。
(a) 求 $I(N; X^N)$；(b) 求 $H(X^N \\,|\\, N)$；(c) 求 $H(X^N)$。

再考虑另一种停止规则：$N$ 与序列独立，以 $1/3$ 概率取 $N=6$、以 $2/3$ 概率取 $N=12$。
(d) 求 $I(N; X^N)$；(e) 求 $H(X^N\\,|\\,N)$；(f) 求 $H(X^N)$。`,
  solution: `**情形一：停时 $N$ = 首个 1 出现的位置。**

**(a)** 关键：$X^N$（形如 $0\\cdots01$）的**长度就是 $N$**，所以 $N$ 是 $X^N$ 的确定函数，$H(N\\,|\\,X^N) = 0$：

$$I(N; X^N) = H(N) - H(N\\,|\\,X^N) = H(N)$$

$N$ 服从几何分布（参数 $1/2$），由第 2.1 题结论"几何分布的熵等于均值"：

$$I(N; X^N) = E[N] = 2 \\text{ bits}$$

**(b)** 给定 $N$，序列被完全定死：前 $N-1$ 位全 0、第 $N$ 位为 1：

$$H(X^N\\,|\\,N) = 0$$

**(c)** 链式法则反向：

$$H(X^N) = I(N; X^N) + H(X^N\\,|\\,N) = 2 + 0 = \\boxed{2 \\text{ bits}}$$

**情形二：$N$ 与序列独立（$1/3$ 概率停在第 6 位，$2/3$ 概率停在第 12 位）。**

**(d)** 但注意 $X^N$ 仍是"截到 $N$ 为止的序列"，其长度依然暴露 $N$，故 $H(N\\,|\\,X^N) = 0$：

$$I(N; X^N) = H(N) = H_2\\Big(\\frac{1}{3}\\Big) \\approx 0.918 \\text{ bits}$$

（此时 $N$ 的信息全部来自"长度"，而不是序列内容。）

**(e)** 给定 $N$，序列就是独立的公平比特串：

$$H(X^N\\,|\\,N) = \\tfrac{1}{3} H(X^6) + \\tfrac{2}{3} H(X^{12}) = \\tfrac{1}{3}\\cdot 6 + \\tfrac{2}{3}\\cdot 12 = \\boxed{10 \\text{ bits}}$$

**(f)**

$$H(X^N) = I(N; X^N) + H(X^N\\,|\\,N) = H_2\\Big(\\frac{1}{3}\\Big) + 10 \\approx 10.918 \\text{ bits}$$

【对比】情形一里，长度与内容纠缠在一起（内容被停止规则吃掉，只剩 2 比特）；情形二里长度与内容各算各的账：$I(N;X^N) = H(N)$ 纯粹是长度账，$H(X^N|N) = 10$ 纯粹是内容账。`
}
];
