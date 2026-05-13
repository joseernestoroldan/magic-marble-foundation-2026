import Container from "../layouts/container/Container";
import Logo from "../Logo/Logo";
import MenuFooter from "./MenuFooter";
import IconsFooter from "./IconsFooter";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 mt-24">
      {/* Línea decorativa superior */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

      {/* Cuerpo principal del footer */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Columna 1 — Logo + descripción legal */}
          <div className="flex flex-col items-center md:items-start gap-5">
            {/* Logo sobre fondo oscuro */}
            <div className="[&_span]:!text-slate-100 [&_.text-cyan-600]:!text-cyan-400">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-center md:text-left max-w-[260px]">
              USA based tax-exempt charitable organization (tax-id number
              86-1626792) under Section 501(c)(3) of the Internal Revenue Code.
              Donations are tax-deductible as allowed by law.
            </p>
          </div>

          {/* Columna 2 — Dirección */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-cyan-400 font-semibold text-base uppercase tracking-widest">
              Register Address
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed text-center md:text-left max-w-[300px]">
              455 E. Eisenhower Parkway #355
              <br />
              Ann Arbor, Michigan, 48108
              <br />
              USA
            </p>
          </div>

          {/* Columna 3 — Menú de navegación */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-cyan-400 font-semibold text-base uppercase tracking-widest">
              Navigation
            </h3>
            <MenuFooter />
          </div>

          {/* Columna 4 — Redes sociales */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-cyan-400 font-semibold text-base uppercase tracking-widest">
              Follow Us
            </h3>
            <p className="text-slate-500 text-sm">
              Stay connected with our community
            </p>
            <IconsFooter />
          </div>
        </div>
      </Container>

      {/* Línea divisoria */}
      <div className="w-full border-t border-slate-700/60" />

      {/* Pie — copyright */}
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-6">
          <p className="text-slate-500 text-xs">
            Created by{" "}
            <span className="text-cyan-400 font-medium">Code2Steps</span>
          </p>
          <p className="text-slate-500 text-xs">
            © 2024 Magic Marble Foundation. All rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
