Change all clases to use CSS modules instead of Tailwind.

1. Create a CSS module file for each component (e.g., `ComponentName.module.css`). At same level as the component file.
example: `Button.tsx` and `Button.module.css`.
2. Move the Tailwind classes from the component file to the CSS module file, converting them to standard CSS syntax.
3. Import the CSS module in the component file and apply the styles using the imported class names.
Example:
   import styles from './Button.module.css';
    <button className={styles.button}>Click me</button>
4. If there are any dynamic classes (e.g., based on props), create conditional class names in the CSS module and apply them accordingly in the component file.
5. If it's not possible to use classes in the module file, you can use inline styles in the component file, but try to keep them minimal and only for dynamic styles that cannot be handled with CSS classes.
6. Remove any unused Tailwind classes from the component file after migrating to CSS modules.

don't build until I ask for it, just migrate the styles.