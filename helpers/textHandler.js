var languages = {
  FR: {
    ERRORS: {
      UNKNOWN: "Une erreur inconnue est survenue.",
      INVALID_PARAM: "L'un des paramètres fournis est invalide.",
      ENTITY_NOT_FOUND: "@entity recherché(e) n'existe pas.",
      VALIDATION: "Au moins l'un des champs est invalide."
    },

    VALIDATIONS: {
      REQUIRED: "@field requis(e).",
      BETWEEN: "@field doit être compris(e) entre @inf et @sup.",
      INVALID: "@field est invalide",
      SUP: "@field doit être supérieur à @inf",
      INF: "@field doit être inférieur à @sup",
      STRICTSUP: "@field doit être strictement supérieur à @inf",
      STRICTINF: "@field doit être strictement inférieur à @sup"
    },

    MODELS: {
      EVENT: {
        NAME: "Événement",
        FIELDS: {
          NAME: "Nom de l'événement",
          BEGINNING: "Date de lancement",
          ENDING: "Date de fin",
          MAXPLAYERS: "Nombre de joueurs max",
          MINLEVEL: "Niveau minimal requis",
          MAXLEVEL: "Niveau maximal requis"
        }
      },
      MATCH: {
        NAME: "Match",
        FIELDS: {
          NBFIGHTS: "Nombre de combats"
        }
      }
    },

    SERVICES: {
      DELETE: {
        SUCCESS: "@entity supprimé(e) avec succès."
      },
      CREATE: {
        SUCCESS: "@entity créé(e) avec succès."
      },
      UPDATE: {
        SUCCESS: "@entity mis(e) à jour avec succès."
      }
    }
  }
}

/* Handle inheritance between models */
var inheritMessages = function(languages, parent, child) {
  for (lang in languages) {
    var parentFields = languages[lang].MODELS[parent].FIELDS;
    for(field in parentFields) {
      languages[lang].MODELS[child].FIELDS[field] = parentFields[field];
    }
  }
}
inheritMessages(languages, 'EVENT', 'MATCH');

module.exports = {
  /* Use to build a message that contains particular token (@field, @entity, @inf ...). 
  Value of token should be provided in the options object. For instance, if a message is
  like "@entity is blablabla", options should be like {entity: 'the name of my entity'}.
   */
  build: function(message, options) {
    var keys = message.match(/@([a-z]+)/g).map(function(a){return a.slice(1);});
    keys.forEach(function(key){
      message = message.replace('@'+key, options[key]);
    });
    return message;
  },

  /* Add the most beautiful language on earth <3 <3 <3. Si si t'as vu ! */
  FR: languages.FR
}