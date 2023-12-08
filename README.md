# Café Campus React App

Bienvenue dans l'application Café Campus, une plateforme web réalisée avec la méthode Agile de DevOps pour une expérience de développement efficace. Cette application utilise React et est hébergée sur AWS.

## Accès à l'Application

L'application est actuellement accessible à l'adresse suivante : [Café Campus](http://cafe-campus.s3-website.eu-west-3.amazonaws.com/)

## Accès au Panneau Admin (Pour les tests)

Pour faciliter les tests, un accès au panneau administratif est disponible avec les informations suivantes :

- **Email :** toto@toto.toto
- **Mot de passe :** toto@toto.toto

Veuillez noter que ces informations sont réservées à des fins de test uniquement.

## Tests et Qualité du Code

Nous mettons en place des tests automatisés pour garantir la qualité du code et le respect des normes définies. Les tests sont effectués à l'aide de GitHub Actions et Husky pre-commit.

### GitHub Actions

Les workflows GitHub Actions sont configurés pour s'exécuter automatiquement à chaque push ou pull request. Ces workflows incluent des étapes de test pour vérifier la stabilité de l'application.

### Husky pre-commit

Nous utilisons Husky pour déclencher des hooks pre-commit locaux avant chaque validation (commit). Ces hooks exécutent les commandes ESLint et Prettier pour s'assurer que le code respecte les règles de formatage et les normes ESLint que nous avons configurées.

## Configuration AWS

L'application est déployée sur AWS, et le processus d'intégration continue (CI) est en place pour garantir des déploiements fiables.

### Infrastructure AWS

L'infrastructure utilise Amazon S3 pour le stockage statique du site web. Pour plus de détails sur la configuration AWS, veuillez consulter les fichiers de configuration dans le fichier `buildspec.yml`.
