interface LegalNoticeProps {
  onBack: () => void;
}

const EMAIL = "sotolabx@sintiens.org";
const H2 = "font-heading text-xl md:text-2xl font-semibold text-on-surface";
const LINK = "text-primary hover:underline underline-offset-4";
const LEAD = "text-on-surface";

/**
 * Página estática de privacidad y aviso legal (ruta /privacidad).
 * Responsable: Germán Soto · Contacto: sotolabx@sintiens.org
 * Mantener sincronizada con los servicios reales (Gemini, Google Fonts,
 * almacenamiento local y service worker) si cambian.
 */
export default function LegalNotice({ onBack }: LegalNoticeProps) {
  return (
    <section className="max-w-[800px] mx-auto" aria-labelledby="privacidad-titulo">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-technical-sm uppercase tracking-[0.15em] text-on-surface-variant hover:text-on-surface transition-colors mb-10"
      >
        <span aria-hidden="true">←</span>
        Volver
      </button>

      <header className="mb-12">
        <h1
          id="privacidad-titulo"
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-on-surface"
        >
          Privacidad y aviso legal
        </h1>
        <p className="text-technical-sm opacity-50 mt-4">Última actualización: 17 de octubre de 2026</p>
      </header>

      <div className="space-y-10 text-body-md text-on-surface-variant leading-relaxed">
        <section className="space-y-3">
          <h2 className={H2}>Quién está detrás de Sintiens</h2>
          <p>
            Sintiens — ¿Qué vidas importan? es un proyecto personal, educativo y divulgativo, sin ánimo de lucro,
            dedicado al análisis crítico y científico de nuestra relación con los animales. Su titular y responsable
            es <strong className={LEAD}>Germán Soto</strong>. Para cualquier duda sobre esta web o sobre el
            tratamiento de tus datos puedes escribir a{" "}
            <a href={`mailto:${EMAIL}`} className={LINK}>
              {EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Qué datos tratamos</h2>
          <p>
            Sintiens no tiene registro de usuarios, cuentas ni formularios que guarden datos personales en nuestros
            servidores. En concreto:
          </p>
          <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
            <li>
              <strong className={LEAD}>Navegación y seguridad.</strong> Al visitar la web, el servidor recibe tu
              dirección IP, imprescindible para servir las páginas. Se usa además, de forma temporal y en memoria
              (durante unos minutos), para limitar el abuso de los servicios de IA (máximo 10 análisis por minuto e
              IP). No se conserva de forma permanente ni se usa para perfilarte.
            </li>
            <li>
              <strong className={LEAD}>Sintiens IA (deconstructor socrático).</strong> El texto que escribes se envía
              a nuestro servidor y este lo reenvía a la API de Google Gemini (Google LLC) para generar el análisis.
              No se almacena en nuestros servidores: tu historial se guarda únicamente en el almacenamiento local de
              tu navegador y puedes borrarlo con el botón «Borrar historial». No escribas en el asistente datos
              personales tuyos o de terceros.
            </li>
            <li>
              <strong className={LEAD}>Preferencias y progreso.</strong> El tema claro/oscuro, los favoritos de tesis
              y dilemas, tu avance de lectura y las preferencias de noticias se guardan solo en tu navegador
              (almacenamiento local y de sesión). No se transmiten a nuestros servidores; al borrar los datos de
              navegación desaparecen.
            </li>
            <li>
              <strong className={LEAD}>Sin cookies de seguimiento ni analítica.</strong> No usamos Google Analytics ni
              herramientas similares, y no instalamos cookies de rastreo. La web puede abrirse sin conexión gracias a
              la caché de su service worker.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Servicios de terceros</h2>
          <p>Para funcionar, la web carga recursos de terceros que reciben tu dirección IP al descargarlos:</p>
          <ul className="space-y-3 list-disc pl-5 marker:text-primary/60">
            <li>
              <strong className={LEAD}>Google Fonts</strong> (fonts.googleapis.com y fonts.gstatic.com): sirve las
              tipografías del sitio.
            </li>
            <li>
              <strong className={LEAD}>API de Google Gemini</strong>: procesa el texto que envíes al deconstructor
              socrático, conforme a las políticas de privacidad de Google.
            </li>
            <li>
              <strong className={LEAD}>Fuentes y enlaces externos:</strong> las noticias enlazan a medios, organismos
              y estudios; al hacer clic sales de Sintiens y se aplican las políticas de esos sitios.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
            portabilidad escribiendo a{" "}
            <a href={`mailto:${EMAIL}`} className={LINK}>
              {EMAIL}
            </a>
            . Como no conservamos datos personales en servidores propios, la mayoría de solicitudes se resolverán
            confirmándote que no se conserva información o indicándote cómo borrar los datos locales de tu navegador.
            Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de
            Protección de Datos (aepd.es).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Propiedad intelectual y uso del contenido</h2>
          <p>
            Los textos, análisis, gráficos e interfaces de Sintiens son propios y pueden citarse o compartirse
            libremente indicando la fuente con un enlace a sintiens.org. Los titulares, citas, marcas e imágenes de
            terceros pertenecen a sus respectivos propietarios y se utilizan con fines informativos, de crítica y
            comentario. Si eres titular de algún contenido y deseas una corrección, escríbenos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Carácter divulgativo</h2>
          <p>
            Los contenidos tienen finalidad educativa y divulgativa: no constituyen asesoramiento médico,
            veterinario, jurídico ni financiero. Los análisis generados por inteligencia artificial pueden contener
            errores; verifica siempre las fuentes enlazadas.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className={H2}>Cambios en este aviso</h2>
          <p>
            Podemos actualizar este aviso para reflejar cambios técnicos o legales. La versión vigente es la que ves
            en esta página, con su fecha de actualización.
          </p>
        </section>
      </div>
    </section>
  );
}
