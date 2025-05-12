export const fr = {
  appName: 'FM Panel',
  common: {
    searchPlaceholder: 'Rechercher...',
    actions: {
      cancel: 'Annuler',
      confirm: 'Confirmer',
      delete: 'Supprimer',
      edit: 'Modifier',
      save: 'Enregistrer',
    },
    yes: 'Oui',
    no: 'Non',
    confirmModal: {
      delete: {
        header: 'Avant de continuer...',
        message:
          'Confirmer la suppression ? Cette action ne pourra pas être annulée.',
      },
    },
  },
  sidebarMenu: {
    inventory: {
      label: 'Inventaire',
      subCategories: {
        productCategories: 'Catégories de produits',
        ingredientCategories: "Catégories d'ingrédients",
        ingredient: 'Ingrédients',
        commande: 'Commandes',
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
        "Êtes-vous sûr de vouloir supprimer ces catégories d'ingrédients ?",
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
  ingredients: {
    title: 'Ingrédients',
    table: {
      label: "Nom d'ingrédient",
      priceHt: 'Prix HT',
      priceTtc: 'Prix TTC',
      imageUrl: 'Image',
      noImage: '',
      action: 'Actions',
      category: 'Catégorie',
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
      editTitle: "Modification de l'ingrédient",
      confirmDeleteTitle: 'Confirmation de la suppression',
      confirmDeleteSingle: 'Êtes-vous sûr de vouloir supprimer : ',
      confirmDeleteMultiple:
        'Êtes-vous sûr de vouloir supprimer ces ingrédients ?',
    },
    search: {
      searchPlaceholder: 'Rechercher...',
      searchByName: 'Rechercher par le nom',
      searchByPriceHt: 'Rechercher par le prix HT',
    },
  },
  productCategory: {
    title: 'Catégories de produits',
    table: {
      headers: {
        label: 'Nom',
        imageUrl: 'Image',
      },
    },
    toolBar: {
      searchPlaceholder: 'Rechercher',
      addButton: 'Nouvelle catégorie',
      deleteManyButton: 'Supprimer',
    },
    dialogs: {
      editDialog: {
        title: 'Modification de la catégorie de produit',
      },
      deleteDialog: {
        title: 'Confirmation de la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ?',
      },
      createDialog: {
        title: 'Nouvelle catégorie de produit',
      },
      deleteManyDialog: {
        title: 'Confirmation de la suppression',
      },
    },
  },
  order: {
    title: {
      id: '#',
      type: 'Type',
      price: 'Prix',
      createdAt: 'Heure',
    },
    dialogs: {
      title: 'Détail de la commande',
      id: 'ID: ',
      createdAt: 'Heure: ',
      price: 'Prix: ',
      withdrawalMethod: 'Méthode de paiement: ',
      terminal: 'Terminal: ',
      status: 'Status: ',
      type: 'Type: ',
      product: 'Produits: ',
    },
    status: {
      PENDING: 'En attente',
      IN_PROGRESS: 'En cours',
      DELIVERED: 'Terminé',
      CANCELED: 'Annulé',
    },
    types: {
      TERMINALS: 'Terminal',
      PICKUP: 'Click & Collect',
      DELIVERY: 'Livraison',
    },
  },
}
