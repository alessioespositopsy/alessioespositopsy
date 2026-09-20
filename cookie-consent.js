/* cookie-consent.js — Alessio Esposito, Psicologo Clinico
 * Inizializza vanilla-cookieconsent v3 e gestisce il consenso GDPR.
 * Caricato in fondo al <body> di ogni pagina.
 */
(function () {
  'use strict';

  function initConsent() {
    if (typeof CookieConsent === 'undefined') {
      console.warn('[cookie-consent] vanilla-cookieconsent non caricato.');
      return;
    }

    CookieConsent.run({
      autoShow: true,
      hideFromBots: true,
      disablePageInteraction: false,
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false
        }
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        functional: {},
        analytics: {}
      },
      language: {
        default: 'it',
        translations: {
          it: {
            consentModal: {
              title: 'Rispettiamo la tua privacy',
              description: 'Questo sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie funzionali (mappa, prenotazioni) e analitici (Google Analytics). Puoi accettare tutti, solo i necessari oppure gestire le preferenze.',
              acceptAllBtn: 'Accetta tutti',
              acceptNecessaryBtn: 'Solo necessari',
              showPreferencesBtn: 'Gestisci preferenze',
              closeIconLabel: 'Chiudi',
              footer: '<a href="privacy-policy.html">Privacy Policy</a> · <a href="cookie-policy.html">Cookie Policy</a>'
            },
            preferencesModal: {
              title: 'Preferenze cookie',
              acceptAllBtn: 'Accetta tutti',
              acceptNecessaryBtn: 'Solo necessari',
              savePreferencesBtn: 'Salva preferenze',
              closeIconLabel: 'Chiudi',
              serviceCounterLabel: 'servizi',
              sections: [
                {
                  title: 'Cookie necessari',
                  description: 'Indispensabili al corretto funzionamento del sito (es. salvataggio delle preferenze di consenso). Non possono essere disattivati.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Cookie funzionali',
                  description: 'Permettono di utilizzare la mappa interattiva dello studio (Google Maps) e il sistema di prenotazione online (MioDottore / Docplanner).',
                  linkedCategory: 'functional'
                },
                {
                  title: 'Cookie analitici',
                  description: 'Utilizzati da Google Analytics per raccogliere statistiche anonime e aggregate sull’uso del sito. Ci aiutano a migliorarlo.',
                  linkedCategory: 'analytics'
                }
              ]
            }
          }
        }
      },
      onFirstConsent: function () { /* prima scelta */ },
      onConsent: function () { /* consenso fornito o aggiornato */ },
      onChange: function () { /* categorie modificate */ }
    });

    // Helper globale per aprire le preferenze dal placeholder della mappa.
    window.openCookiePreferences = function () {
      if (window.CookieConsent && typeof CookieConsent.showPreferences === 'function') {
        CookieConsent.showPreferences();
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsent);
  } else {
    initConsent();
  }
})();
