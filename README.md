# Diff Checker 🔍

Un comparador de textos online gratuito y de código abierto. Compara dos textos y visualiza las diferencias lado a lado con resaltado de colores.

## ✨ Características

- 📝 **Comparación lado a lado**: Visualiza las diferencias de forma clara
- 📁 **Carga de archivos**: Soporta múltiples formatos (.txt, .md, .json, .csv, .xml, .html, .css, .js, .ts, .py, .java, .sql, .sh, .yaml)
- 🖱️ **Drag & Drop**: Arrastra archivos directamente
- 🎨 **Resaltado de cambios**:
  - 🔴 Rojo para texto eliminado
  - 🟢 Verde para texto agregado
- 📊 **Estadísticas**: Contador de caracteres y líneas
- 📱 **Responsive**: Compatible con desktop y móvil
- 🚀 **Fast**: Construido con React, Vite y TypeScript

## 🚀 Tecnologías

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **diff-match-patch** - Diff algorithm
- **GitHub Pages** - Hosting

## 💻 Desarrollo

### Requisitos

- Node.js 18+
- npm

### Instalación

```bash
git clone https://github.com/yegecali/diffchecker.git
cd diffchecker
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5174](http://localhost:5174) en tu navegador.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── FileUpload.tsx    # Componente de carga de archivos
│   ├── Modal.tsx         # Componente modal reutilizable
│   ├── DiffViewer.tsx    # Visor de diferencias
│   └── TextInput.tsx     # Entrada de texto
├── App.tsx               # Componente principal
├── App.css               # Estilos personalizados
├── index.css             # Estilos globales
└── main.tsx              # Punto de entrada
```

## 🌐 Despliegue

El sitio se despliega automáticamente a GitHub Pages cuando haces push a la rama `main` mediante GitHub Actions.

**URL de producción**: https://yegecali.github.io/diffchecker/

## 📝 Licencia

MIT - Siéntete libre de usar este proyecto para lo que necesites.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue o un pull request.

## 👨‍💻 Autor

Desarrollado por [yegecali](https://github.com/yegecali)

---

⭐ Si te gusta el proyecto, no olvides darle una estrella en GitHub!

      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
