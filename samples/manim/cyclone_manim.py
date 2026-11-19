from manim import *

BG = "#050B14"
CYAN = "#38E8FF"
AMBER = "#FFB020"
WHITE = "#F4F8FF"
MUTED = "#6B7F99"


def line_block(text, size, color=WHITE, weight=BOLD):
    return Text(text, font="Inter", font_size=size, color=color, weight=weight)


class CycloneShort(Scene):
    def construct(self):
        self.camera.background_color = BG

        # Scene 1: title (0-4 s)
        kicker = Text("BREAKING · INDIA", font="Inter", font_size=28, color=CYAN, weight=BOLD)
        kicker.shift(UP * 3.2)
        title = VGroup(
            Text("SEVERE", font="Inter", font_size=72, color=WHITE, weight=BOLD),
            Text("CYCLONIC STORM", font="Inter", font_size=60, color=WHITE, weight=BOLD),
        ).arrange(DOWN, buff=0.25).shift(UP * 0.3)
        spiral = VMobject(color=CYAN, stroke_width=3)
        pts = [
            np.array([
                0.6 * (0.1 + 3.2 * t) * np.cos(t * 7 * PI),
                0.6 * (0.1 + 3.2 * t) * np.sin(t * 7 * PI) * 0.62 - 2.5,
                0,
            ])
            for t in np.linspace(0, 1, 120)
        ]
        spiral.set_points_smoothly(pts)
        self.play(FadeIn(kicker, shift=UP * 0.2), run_time=0.6)
        self.play(Create(spiral), Write(title), run_time=2.0)
        self.wait(0.2)
        self.play(FadeOut(kicker), FadeOut(title), FadeOut(spiral), run_time=0.8)

        # Scene 2: location and winds (4-9 s)
        loc_label = Text("LOCATION", font="Inter", font_size=26, color=AMBER, weight=BOLD).shift(UP * 3.4)
        loc = VGroup(
            Text("~530 km south", font="Inter", font_size=64, color=WHITE, weight=BOLD),
            Text("of Gopalpur", font="Inter", font_size=64, color=WHITE, weight=BOLD),
        ).arrange(DOWN, buff=0.2).shift(UP * 2.0)
        w_label = Text("Sustained winds", font="Inter", font_size=28, color=MUTED).shift(UP * 0.2)
        w_val = Text("90–100 km/h", font="Inter", font_size=76, color=CYAN, weight=BOLD).shift(DOWN * 0.6)
        g_label = Text("Gusts", font="Inter", font_size=28, color=MUTED).shift(DOWN * 1.8)
        g_val = Text("110 km/h", font="Inter", font_size=76, color=AMBER, weight=BOLD).shift(DOWN * 2.6)
        self.play(FadeIn(loc_label), Write(loc), run_time=1.0)
        self.play(FadeIn(w_label, shift=UP * 0.2), FadeIn(w_val, shift=UP * 0.2), run_time=1.0)
        self.wait(0.3)
        self.play(FadeIn(g_label), FadeIn(g_val), run_time=1.0)
        self.wait(0.4)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.8)

        # Scene 3: landfall (9-12.3 s)
        lf = Text("LANDFALL", font="Inter", font_size=26, color=CYAN, weight=BOLD).shift(UP * 3.0)
        when = Text("By noon Friday, 20 Nov", font="Inter", font_size=60, color=WHITE, weight=BOLD).shift(UP * 0.8)
        where = Text("Between Narsapur and Puri,", font="Inter", font_size=36, color=MUTED).shift(DOWN * 0.4)
        where2 = Text("near Gopalpur", font="Inter", font_size=36, color=MUTED).shift(DOWN * 1.0)
        bar = Line(LEFT * 3.2, RIGHT * 3.2, color=CYAN, stroke_width=4).shift(UP * 1.9)
        self.play(FadeIn(lf), Create(bar), run_time=0.8)
        self.play(Write(when), run_time=1.0)
        self.play(FadeIn(where), FadeIn(where2), run_time=1.0)
        self.wait(0.3)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.7)

        # Scene 4: alert (12.3-15 s)
        al = Text("ALERT", font="Inter", font_size=26, color=AMBER, weight=BOLD).shift(UP * 3.0)
        surge = Text("Storm surge", font="Inter", font_size=44, color=MUTED).shift(UP * 1.0)
        surge_v = Text("0.5–1.0 m", font="Inter", font_size=96, color=WHITE, weight=BOLD).shift(UP * 0.1)
        fish = Text("Fishing suspended", font="Inter", font_size=44, color=CYAN).shift(DOWN * 1.5)
        src = Text("Source: IMD Bulletin 29, 19 Nov", font="Inter", font_size=24, color=MUTED).shift(DOWN * 3.0)
        self.play(FadeIn(al), run_time=0.5)
        self.play(FadeIn(surge), Write(surge_v), run_time=1.0)
        self.play(FadeIn(fish), FadeIn(src), run_time=1.0)
        self.wait(0.6)
