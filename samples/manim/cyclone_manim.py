from manim import *

BG = "#050B14"
CYAN = "#38E8FF"
AMBER = "#FFB020"
WHITE = "#F4F8FF"
MUTED = "#6B7F99"


def txt(s, size, color=WHITE, weight=BOLD):
    return Text(s, font="Inter", font_size=size, color=color, weight=weight)


class CycloneShort(Scene):
    def construct(self):
        self.camera.background_color = BG

        # Scene 1: spiral + title (0-4 s)
        spiral_dots = VGroup(*[
            Dot(point=[0.6 * (0.1 + 3.0 * t) * np.cos(t * 6 * PI), 0.6 * (0.1 + 3.0 * t) * np.sin(t * 6 * PI) * 0.62 - 2.2, 0],
                radius=0.02 + 0.05 * t, color=CYAN)
            for t in np.linspace(0, 1, 140)
        ])
        spin = ValueTracker(0)
        spiral_dots.add_updater(lambda m: m.rotate_about_origin(0) if False else None)
        center = np.array([0, -2.2, 0])
        base = [d.get_center() - center for d in spiral_dots]

        def spin_updater(m):
            a = spin.get_value()
            c, s = np.cos(a * 0.25), np.sin(a * 0.25)
            for d, p in zip(m.submobjects, base):
                d.move_to(center + np.array([c * p[0] - s * p[1], s * p[0] + c * p[1], 0]))
        spiral_dots.add_updater(spin_updater)

        kicker = txt("BREAKING · INDIA", 28, CYAN).shift(UP * 3.4)
        title = VGroup(txt("SEVERE", 72), txt("CYCLONIC STORM", 60)).arrange(DOWN, buff=0.25).shift(UP * 0.3)
        self.add(spiral_dots)
        self.play(FadeIn(kicker, shift=UP * 0.3), Write(title), spin.animate.set_value(2.6), run_time=2.6)
        self.wait(0.2)
        self.play(FadeOut(kicker), FadeOut(title), FadeOut(spiral_dots), run_time=0.7)

        # Scene 2: winds and gauges (4-9.5 s)
        streaks = VGroup()
        rng = np.random.default_rng(3)
        for i in range(12):
            y = -3.6 + i * 0.6
            length = 1.2 + (i % 4) * 0.5
            streaks.add(Line(LEFT * length / 2, RIGHT * length / 2, color=CYAN, stroke_width=3)
                        .move_to([rng.uniform(-6, 6), y, 0]).set_opacity(0.25 + (i % 3) * 0.2))
        streaks.add_updater(lambda m, dt: [s.shift(RIGHT * 0.09 * (1 + (i % 5) * 0.4)) or None for i, s in enumerate(m.submobjects)] and None)
        loc_label = txt("LOCATION", 26, AMBER).shift(UP * 3.5)
        loc = VGroup(txt("~530 km south", 56), txt("of Gopalpur", 56)).arrange(DOWN, buff=0.2).shift(UP * 2.4)
        c1 = np.array([0, -0.4, 0])
        c2 = np.array([0, -2.7, 0])
        def gauge(center, color, frac_tracker, value, label):
            bg = Arc(radius=0.95, start_angle=PI / 2, angle=-2 * PI, color=MUTED, stroke_width=10).set_opacity(0.3).move_to(center)
            ring = always_redraw(lambda: Arc(radius=0.95, start_angle=PI / 2, angle=-2 * PI * frac_tracker.get_value(),
                                             color=color, stroke_width=10).move_to(center))
            val = txt(value, 34, color).move_to(center)
            lab = txt(label, 24, MUTED).move_to(center + UP * 1.45)
            return bg, ring, val, lab
        w_tracker = ValueTracker(0)
        g_tracker = ValueTracker(0)
        bg1, ring1, val1, lab1 = gauge(c1, CYAN, w_tracker, "90–100", "SUSTAINED WINDS KM/H")
        bg2, ring2, val2, lab2 = gauge(c2, AMBER, g_tracker, "110", "GUSTS KM/H")
        self.add(streaks)
        self.play(FadeIn(loc_label), Write(loc), run_time=0.8)
        self.add(bg1, ring1, val1, lab1)
        self.play(w_tracker.animate.set_value(0.9), run_time=1.2)
        self.add(bg2, ring2, val2, lab2)
        self.play(g_tracker.animate.set_value(1.0), run_time=1.0)
        self.wait(0.3)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.7)

        # Scene 3: storm track into the coast (9.5-12.5 s)
        land = np.array([-1.2, -2.6, 0])
        start = np.array([2.6, 0.2, 0])
        ctrl = np.array([1.6, -1.6, 0])
        track = VMobject(color=CYAN, stroke_width=4).set_points_as_corners([start, ctrl, land])
        track.set_points_smoothly([start, (start + ctrl) / 2 + np.array([0.1, 0, 0]), ctrl, land])
        coast = Line(LEFT * 4.5 + DOWN * 3.2, RIGHT * 4.5 + DOWN * 3.5, color=MUTED, stroke_width=3)
        marker = Dot(start, color=CYAN, radius=0.12)
        ring = always_redraw(lambda: Circle(radius=0.25 + 0.2 * np.sin(self.renderer.time * 6) ** 2,
                                            color=AMBER, stroke_width=3).move_to(land))
        lf_label = txt("LANDFALL", 26, CYAN).shift(UP * 3.5)
        when = txt("By noon Friday, 20 Nov", 46).shift(UP * 2.3)
        where = txt("Between Narsapur and Puri,", 30, MUTED).shift(UP * 1.6)
        where2 = txt("near Gopalpur", 30, MUTED).shift(UP * 1.1)
        self.play(FadeIn(lf_label), FadeIn(when), FadeIn(where), FadeIn(where2), Create(coast), run_time=1.0)
        self.add(track, marker, ring)
        self.play(MoveAlongPath(marker, track), Create(track), run_time=1.8)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)

        # Scene 4: surge waves + alert (12.5-15 s)
        al = txt("ALERT", 26, AMBER).shift(UP * 3.6)
        surge = txt("Storm surge", 44, MUTED).shift(UP * 2.4)
        surge_v = txt("0.5–1.0 m", 96).shift(UP * 1.3)
        fish = txt("Fishing suspended", 44, CYAN).shift(UP * 0.1)
        src = txt("Source: IMD Bulletin 29, 19 Nov", 24, MUTED).shift(UP * 0.9)
        waves = VGroup(*[
            FunctionGraph(lambda x: 0.05, x_range=[-4.5, 4.5], color=CYAN if k % 2 == 0 else AMBER)
            .shift(DOWN * (2.4 + k * 0.45)).set_stroke(opacity=0.35 + k * 0.1, width=4)
            for k in range(5)
        ])
        phase = ValueTracker(0)
        amp = ValueTracker(0.05)
        def wave_update(m):
            for k, w in enumerate(m.submobjects):
                shift_y = -2.4 - k * 0.45
                w.become(FunctionGraph(lambda x: amp.get_value() * (0.6 + 0.1 * k) * np.sin(x * 1.6 + phase.get_value() + k * 0.8),
                                       x_range=[-4.5, 4.5], color=CYAN if k % 2 == 0 else AMBER)
                         .shift(DOWN * (2.4 + k * 0.45)).set_stroke(opacity=0.35 + k * 0.1, width=4))
        waves.add_updater(wave_update)
        self.add(waves)
        self.play(FadeIn(al), FadeIn(surge), Write(surge_v), run_time=1.0)
        self.play(FadeIn(fish), FadeIn(src), run_time=0.6)
        self.play(phase.animate.set_value(PI * 4), amp.animate.set_value(0.45), run_time=2.4)
        self.wait(0.2)
