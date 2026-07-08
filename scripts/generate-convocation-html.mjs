import fs from "node:fs";
import path from "node:path";

const candidates = [
  {
    line1: "DO OFFICIA AUT QUIA Voluptate aut repudi",
    line2: "Sunt id qui est min",
    line3: "Necessitatibus quis PROIDENT VOLUPTAS E",
    line4: "Labore et tempor vol",
    ceres: "Est dolore nisi pla",
  },
  {
    line1: "EXERCITATIONEM FUGIA Sit lorem temporibu",
    line2: "Beatae quo blanditii",
    line3: "Enim sint et non eo NIHIL FUGIAT VOLUPTA",
    line4: "Labore et tempor vol",
    ceres: "Saepe similique qui",
  },
  {
    line1: "SUNT DOLOR SAEPE TOT Ea id qui voluptas",
    line2: "Sed numquam laudanti",
    line3: "Ab qui in deserunt v ASPERIORES ULLAMCO N",
    line4: "Labore et tempor vol",
    ceres: "Exercitationem volup",
  },
];

function wordPageBreak() {
  return `<p style="margin:0; padding:0; line-height:0; font-size:0; page-break-before:always;"><br clear="all" style="mso-special-character:line-break; clear:both;" /></p>`;
}

function convocationPage(candidate, isFirstPage) {
  return `
  ${isFirstPage ? "" : wordPageBreak()}
  <div class="page">
    <table class="header-table" style="width:100%; border-collapse:collapse; border:none; margin-bottom:12px;">
      <tr>
        <td style="width:19%; vertical-align:top; border:none; padding:0;">
          <p style="margin:0; font-family:Arial,sans-serif; font-size:14pt; font-weight:bold; color:#003B7A;">NOVIA</p>
        </td>
        <td style="width:48%; vertical-align:top; border:none; padding:0 0 0 10px;">
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; color:#14213D;">NOVIA</p>
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:8.5pt; color:#8296A8;">1 RUE BAUDIN 34000 MONTPELLIER</p>
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:8.5pt; color:#8296A8;">Tél : +33 04 30 00 66 20</p>
          <p style="margin:0; font-family:Arial,sans-serif; font-size:8.5pt; color:#8296A8;">vixuxoci@mailinator.com</p>
        </td>
        <td style="width:33%; vertical-align:top; border:none; padding:0;">
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:9.5pt; font-weight:bold; color:#14213D;">${candidate.line1}</p>
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:9pt; color:#14213D;">${candidate.line2}</p>
          <p style="margin:0 0 2px; font-family:Arial,sans-serif; font-size:9pt; color:#14213D;">${candidate.line3}</p>
          <p style="margin:8px 0 0; font-family:Arial,sans-serif; font-size:8.5pt; color:#8296A8;">${candidate.line4}</p>
        </td>
      </tr>
    </table>

    <hr style="border:none; border-bottom:1px solid #B0BEC5; margin:16px 0 20px;" />

    <p style="margin:0 0 16px; font-family:Arial,sans-serif; font-size:9.5pt; color:#14213D;">
      <strong>Objet :</strong> Convocation à la session d'examen du 27/05/1994 au 28/03/1973 — Assistant Ressources Humaines.
    </p>

    <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
      <tr>
        <td style="background:#003B7A; color:#FFFFFF; text-align:center; padding:10px 12px; border:2px solid #003B7A; font-family:Arial,sans-serif; font-size:13pt; font-weight:bold;">EXAMEN INTERNE — CCP/COMPÉTENCE</td>
      </tr>
      <tr>
        <td style="background:#003B7A; color:#FFFFFF; text-align:center; padding:10px 12px; border-left:2px solid #003B7A; border-right:2px solid #003B7A; font-family:Arial,sans-serif; font-size:11pt; font-weight:bold;">TP-00765 Assistant Ressources Humaines</td>
      </tr>
      <tr>
        <td style="background:#003B7A; color:#FFFFFF; text-align:center; padding:10px 12px; border-left:2px solid #003B7A; border-right:2px solid #003B7A; font-family:Arial,sans-serif; font-size:11pt; font-weight:bold;">Session n°Cumque voluptatem na</td>
      </tr>
      <tr>
        <td style="background:#FFFFFF; color:#C0392B; text-align:center; padding:10px 12px; border:2px solid #003B7A; font-family:Arial,sans-serif; font-size:11pt; font-weight:bold;">Du 27/05/1994 au 28/03/1973</td>
      </tr>
    </table>

    <p style="margin:0 0 8px; font-family:Arial,sans-serif; font-size:10pt; color:#14213D;">Madame, Monsieur,</p>

    <p style="margin:0 0 8px; font-family:Arial,sans-serif; font-size:10pt; color:#14213D; text-align:justify;">
      Vous êtes convoqué(e) à la session d'examen visant l'obtention du titre professionnel de Assistant Ressources Humaines (TP-00765) qui se déroulera au centre de NOVIA.
    </p>

    <p style="margin:0 0 8px; font-family:Arial,sans-serif; font-size:10pt; color:#14213D; text-align:justify;">
      Vous voudrez bien vous présenter muni(e) d'une pièce d'identité et de la présente convocation à l'adresse suivante :
    </p>

    <p style="margin:12px 0; font-family:Arial,sans-serif; font-size:11pt; font-weight:bold; color:#14213D; text-align:center;">1 RUE BAUDIN 34000 MONTPELLIER</p>

    <p style="margin:0 0 12px; font-family:Arial,sans-serif; font-size:9.5pt; color:#14213D;">
      <strong>N° candidat CERES :</strong> ${candidate.ceres}
    </p>

    <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
      <tr>
        <td style="width:40%; background:#003B7A; color:#FFFFFF; padding:8px 12px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; border-top:1px solid #003B7A; border-bottom:1px solid #003B7A;">Épreuve</td>
        <td style="width:36%; background:#003B7A; color:#FFFFFF; padding:8px 12px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; text-align:center; border-top:1px solid #003B7A; border-bottom:1px solid #003B7A;">Date</td>
        <td style="width:24%; background:#003B7A; color:#FFFFFF; padding:8px 12px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; text-align:center; border-top:1px solid #003B7A; border-bottom:1px solid #003B7A;">Heure de convocation</td>
      </tr>
      <tr>
        <td style="background:#E8F1FB; padding:8px 12px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; color:#14213D; border-bottom:1px solid #B0BEC5;">Épreuve écrite <span style="font-weight:normal; color:#8296A8; font-size:7.5pt;">(—)</span></td>
        <td style="background:#E8F1FB; padding:8px 12px; font-family:Arial,sans-serif; font-size:9pt; font-weight:bold; color:#003B7A; text-align:center; border-bottom:1px solid #B0BEC5;">Vendredi 27 mai 1994</td>
        <td style="background:#E8F1FB; padding:8px 12px; font-family:Arial,sans-serif; font-size:11pt; font-weight:bold; color:#C0392B; text-align:center; border-bottom:1px solid #B0BEC5;">—</td>
      </tr>
    </table>

    <p style="margin:0 0 8px; font-family:Arial,sans-serif; font-size:10pt; color:#14213D; text-align:justify;">
      Merci de vous présenter 10 minutes avant l'heure indiquée, muni(e) d'une pièce d'identité valide.
    </p>

    <p style="margin:0 0 16px; font-family:Arial,sans-serif; font-size:10pt; color:#14213D; text-align:justify;">
      Je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.
    </p>

    <p style="margin:0; font-family:Arial,sans-serif; font-size:9.5pt; color:#8296A8;">Le responsable de session</p>
    <p style="margin:0 0 12px; font-family:Arial,sans-serif; font-size:10pt; font-weight:bold; color:#14213D;">Nostrud sed elit od</p>

    <hr style="border:none; border-top:1px solid #B0BEC5; margin:16px 0 0;" />
    <p style="margin:8px 0 0; font-family:Arial,sans-serif; font-size:8pt; color:#8296A8; text-align:center;">
      NOVIA — 1 RUE BAUDIN 34000 MONTPELLIER — +33 04 30 00 66 20 — vixuxoci@mailinator.com
    </p>
  </div>`;
}

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Convocations Candidats — Session Cumque voluptatem na</title>
  <style>
    @page { size: A4; margin: 1.8cm 1.8cm; }
    body { margin: 0; padding: 0; background: #fff; color: #14213D; }
    .page { max-width: 18cm; margin: 0 auto; }
    table { border-spacing: 0; }
    td { vertical-align: top; }
    p { margin-top: 0; }
  </style>
</head>
<body>
<div class="Section1">
${candidates.map((c, i) => convocationPage(c, i === 0)).join("\n")}
</div>
</body>
</html>`;

const outPath = path.resolve(
  "public/Convocations_Candidats_SessionCumque voluptatem na.html",
);
fs.writeFileSync(outPath, html, "utf8");
console.log("Generated:", outPath);
