export default function Page() {
  const details = [
    { label: "Email", value: "pp.peempon@gmail.com", href: "mailto:pp.peempon@gmail.com" },
    { label: "Phone", value: "+66 984 180-481", href: "tel:+66984180481" },
    { label: "Instagram", value: "@none", href: "https://instagram.com/averyquinn" },
    { label: "Location", value: "Bangkok, Thailand", href: "https://maps.google.com/?q=Bangkok+Thailand" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, rgba(148, 163, 184, 0.22), rgba(15, 23, 42, 0.96) 38%), linear-gradient(135deg, #020617 0%, #0f172a 55%, #111827 100%)",
        color: "#e2e8f0",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "28px",
        }}
      >
        <section
          style={{
            background: "rgba(15, 23, 42, 0.72)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "28px",
            padding: "36px",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              color: "#bfdbfe",
              padding: "8px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Available for select projects
          </div>

          <h1
            style={{
              margin: "22px 0 14px",
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
              fontWeight: 800,
              color: "#f8fafc",
            }}
          >
            Mock up preview.
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: "620px",
              fontSize: "1.12rem",
              lineHeight: 1.7,
              color: "#cbd5e1",
            }}
          >
            I&apos;m PP — a software systems engineer, web developer,  for a web development it's my second jobs.
            my background is in software systems engineering, and I specialize in creating digital experiences that are both functional and visually stunning.
             Whether you&apos;re looking to launch a new brand, revamp your website, or explore innovative ideas,
            I&apos;m here to help bring your vision to life. it's so good to work with you and I&apos;m excited to hear about your project.
            (PP)
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "30px",
            }}
          >
            <a
              href="mailto:pp.peempon@gmail.com"
              style={{
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
                color: "#020617",
                fontWeight: 800,
                boxShadow: "0 18px 40px rgba(56, 189, 248, 0.3)",
              }}
            >
              Book a call
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: "14px",
                border: "1px solid rgba(148, 163, 184, 0.4)",
                color: "#e2e8f0",
                background: "rgba(15, 23, 42, 0.4)",
                fontWeight: 700,
              }}
            >
              View profile
            </a>
          </div>

          <div
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "14px",
            }}
          >
            {[
              ["2+", "Years web development experience"],
              ["4", "Projects completed"],
              ["∞", "Ideas worth chasing"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  background: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "18px",
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f8fafc" }}>{value}</div>
                <div style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "#94a3b8" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <aside
          style={{
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.84))",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "28px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 45%, #38bdf8 100%)",
                display: "grid",
                placeItems: "center",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              PP
            </div>
            <div
              style={{
                borderRadius: "999px",
                padding: "8px 12px",
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(74, 222, 128, 0.4)",
                color: "#bbf7d0",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Online now
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.76rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8" }}>
              Contact
            </div>
            <h2 style={{ margin: "10px 0 0", color: "#f8fafc", fontSize: "1.8rem" }}>PP</h2>
            <p style={{ margin: "8px 0 0", color: "#cbd5e1", lineHeight: 1.6 }}>
              Software systems engineer • Web developer • AI developer
            </p>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {details.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: "rgba(15, 23, 42, 0.62)",
                  border: "1px solid rgba(148, 163, 184, 0.14)",
                  textDecoration: "none",
                  color: "#e2e8f0",
                }}
              >
                <span style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {item.label}
                </span>
                <span style={{ fontWeight: 700, textAlign: "right" }}>{item.value}</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
