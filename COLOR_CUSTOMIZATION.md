# Color Customization Guide

This CV uses a comprehensive color system that's easy to customize. All colors are defined in `tailwind.config.js` and can be modified without touching any component code.

## Color Categories

### 1. Primary Colors

```javascript
primary: {
  text: '#1a1a1a',        // Main headings and important text
  background: '#ffffff',   // Page background
}
```

### 2. Secondary Colors

```javascript
secondary: {
  text: '#374151',        // Job titles, dates, locations (darker for better readability)
  muted: '#6b7280',       // Subtle details, descriptions
}
```

### 3. Accent Colors

```javascript
accent: {
  primary: '#2563eb',     // Main accent color (deeper blue)
  hover: '#1d4ed8',       // Hover state for links
  subtle: '#eff6ff',      // Subtle background for highlights
}
```

### 4. Border Colors

```javascript
border: {
  light: '#d1d5db',       // Light borders and dividers
  medium: '#9ca3af',      // Medium borders
}
```

### 5. Section Background Colors

```javascript
section: {
  light: '#f9fafb',       // Very light background for sections
  subtle: '#f3f4f6',      // Subtle background for job entries
}
```

## How to Customize

1. **Open `tailwind.config.js`**
2. **Find the color you want to change**
3. **Replace the hex value**
4. **Save the file** - changes will appear immediately

## Example Customizations

### Professional Blue Theme

```javascript
accent: {
  primary: '#2563eb',     // Deeper blue
  hover: '#1d4ed8',       // Darker hover
  subtle: '#dbeafe',      // Lighter blue background
}
```

### Warm Professional Theme

```javascript
primary: {
  text: '#1f2937',        // Darker gray
  background: '#ffffff',
},
secondary: {
  text: '#6b7280',        // Warmer gray
  muted: '#9ca3af',       // Lighter warm gray
},
accent: {
  primary: '#dc2626',     // Red accent
  hover: '#b91c1c',       // Darker red
  subtle: '#fef2f2',      // Light red background
}
```

### Minimalist Theme

```javascript
primary: {
  text: '#000000',        // Pure black
  background: '#ffffff',
},
secondary: {
  text: '#666666',        // Simple gray
  muted: '#999999',       // Light gray
},
accent: {
  primary: '#000000',     // Black links
  hover: '#333333',       // Dark gray hover
  subtle: '#f5f5f5',      // Very light gray
}
```

## Color Usage in Components

- **H1 (Name)**: `text-primary-text`
- **H2 (Sections)**: `text-primary-text`
- **H3 (Companies)**: `text-primary-text` (clean, no background)
- **Job Titles**: `text-primary-text` (via `<strong>`)
- **Dates**: `text-secondary-muted` (via `<em>`)
- **Descriptions**: `text-secondary-text`
- **Links**: `text-accent-primary` with `hover:text-accent-hover`
- **Borders**: `border-border-light`

## Tips for Good Color Choices

1. **Contrast**: Ensure text has good contrast with backgrounds
2. **Hierarchy**: Use different shades to create visual hierarchy
3. **Consistency**: Keep accent colors consistent throughout
4. **Accessibility**: Test colors for accessibility (WCAG guidelines)
5. **Print-friendly**: Ensure colors work well when printed

## Testing Your Changes

1. Save `tailwind.config.js`
2. The development server will automatically reload
3. Check the CV at `http://localhost:5174`
4. Test on different screen sizes
5. Try printing to PDF to ensure it looks good
