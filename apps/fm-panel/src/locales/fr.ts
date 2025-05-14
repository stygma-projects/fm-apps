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
        productsInventory: 'Produits',
        commande: 'Commandes',
      },
    },
  },
  ingredientCategories: {
    title: "Catégories d'ingrédients",
    table: {
      headers: {
        label: 'Nom',
        imageUrl: 'Image',
        action: 'Actions',
      }
    },
    toolBar: {
      searchPlaceholder: 'Rechercher',
      addButton: 'Nouvelle catégorie',
      deleteManyButton: 'Supprimer',
    },
    dialogs: {
      editDialog: {
        title: 'Modification de la catégorie',
      },
      deleteDialog: {
        title: 'Confirmation de la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ?',
      },
      createDialog: {
        title: 'Nouvelle catégorie',
      },
      deleteManyDialog: {
        title: 'Confirmation de la suppression',
      },
    },
    booleanValues: {
      true: 'Oui',
      false: 'Non',
    },
    noImage: "Pas d'image fournie",
  },
  ingredient: {
    title: 'Ingrédients',
    table: {
      headers: {
        label: 'Nom',
        imageUrl: 'Image',
        priceExclTax: 'Prix HT',
        priceIncludingTax: 'Prix TTC',
        category: 'Catégorie',
      },
    },
    toolBar: {
      searchPlaceholder: 'Rechercher',
      addButton: 'Nouvel ingrédient',
      deleteManyButton: 'Supprimer',
    },
    dialogs: {
      editDialog: {
        title: 'Modification de l\'ingrédient',
      },
      deleteDialog: {
        title: 'Confirmation de la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ?',
      },
      createDialog: {
        title: 'Nouvel ingrédient',
      },
      deleteManyDialog: {
        title: 'Confirmation de la suppression',
      },
    },
    booleanValues: {
      true: 'Oui',
      false: 'Non',
    },
    noImage: "Pas d'image fournie",
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
    booleanValues: {
      true: 'Oui',
      false: 'Non',
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
    noImage: "Pas d'image fournie",
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
  productsInventory: {
    table: {
      headers: {
        label: 'Nom',
        imageUrl: 'Image',
        priceExclTax: 'Prix HT',
        priceIncludingTax: 'Prix TTC',
        available: 'Disponibilité',
        category: 'Catégorie',
        categoryId: 'Catégorie',
        ingredients: 'Ingrédients',
      },
    },
    toolBar: {
      searchPlaceholder: 'Rechercher',
      addButton: 'Nouveau produit',
      deleteManyButton: 'Supprimer',
    },
    title: 'Produits',
    dialogs: {
      editDialog: {
        title: 'Modification du produit',
      },
      deleteDialog: {
        title: 'Confirmation de la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ?',
      },
      createDialog: {
        title: 'Nouveau produit',
        categoryPlaceholder: 'Sélectionner une catégorie',
        ingredientsPlaceholder: 'Sélectionner des ingrédients',
      },
      deleteManyDialog: {
        title: 'Confirmation de la suppression',
      },
    },
    booleanValues: {
      true: 'Oui',
      false: 'Non',
    },
    availability: {
      available: 'Disponible',
      notAvailable: 'Rupture de stock',
    },
    noImage: "Pas d'image fournie",
  },
}
