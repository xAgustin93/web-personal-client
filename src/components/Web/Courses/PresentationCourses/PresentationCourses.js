import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos de Agustín Navarro Galdon" />
      <p>
        En Agustin Navarro Academy vas a encontrar los mejores cursos online de
        desarrollo web en Español. Unete a nosotros y empieza tu camino como
        Desarrodor Web o Desarrollador de CMS. Sinceramente, estos curso es el
        tipo de contenido que a mi me hubiera gustado encontrar cuando empecé en
        el mundo del desarrollo web profesional.
      </p>
      <p>¡¡¡Échales un vistazo y aprovecha las ofertas!!!</p>
    </div>
  );
}
