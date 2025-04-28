export const fr = {
  appName: 'FM Panel',
  sidebarMenu: {
    inventory: {
      label: 'Inventaire',
      subCategories: {
        productCategories: 'Catégories de produits',
        ingredientCategories: "Catégories d'ingrédients",
      },
    },
  },
  ingredientCategories: {
    title: "Catégories d'ingrédients",
    table: {
      name: 'Nom',
      imageUrl: 'Image',
      noImage: '',
      action: 'Actions',
    },
    actions: {
      new: 'Nouveau',
      delete: 'Supprimer',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
    },
    dialogs: {
      detailsTitle: "Détails de l'ingrédient",
      confirmDeleteTitle: 'Confirmation de la suppression',
      confirmDeleteSingle: 'Êtes-vous sûr de vouloir supprimer : ',
      confirmDeleteMultiple:
        "Êtes-vous sûr de vouloir supprimer ces catégorie d'ingrédient ?",
    },
    error: {
      nameRequired: 'Le nom est requis.',
      imageUrlLength:
        "L'URL de l'image est trop longue et ne peut pas être enregistrée. Veuillez fournir une URL plus courte.",
    },
    buttons: {
      yes: 'Oui',
      no: 'Non',
    },
    searchPlaceholder: 'Rechercher...',
  },
}
