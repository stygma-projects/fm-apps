export default {
    extends: ['@vfourny/node-toolkit/commitlint'],
    rules: {
        'scope-empty': [2, 'never'], // Le scope est obligatoire
        'scope-case': [2, 'always', 'lower-case'], // Toujours en minuscules
        'subject-case': [2, 'always', 'lower-case'], // Sujet en minuscules
        'subject-empty': [2, 'never'], // Le sujet ne peut pas être vide
        'subject-full-stop': [2, 'never', '.'], // Pas de point à la fin du sujet
        'header-max-length': [2, 'always', 100], // Longueur maximale du header
        'custom-scope-format': [2, 'always']
    },
    plugins: [
        {
            rules: {
                'custom-scope-format': ({ scope }) => {
                    // Vérifier que le scope suit le format requis (category:name)
                    const regex = /^(apps|packages):[a-z0-9-_]+$/;

                    if (!scope || !regex.test(scope)) {
                        return [
                            false,
                            'Le scope doit suivre le format "category:name" où category est soit "apps" soit "packages" ' +
                            'et name est le nom du package/app concerné (ex: apps:web, packages:eslint)'
                        ];
                    }

                    return [true, ''];
                }
            }
        }
    ],
}