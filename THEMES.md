# Theme System Documentation

The Autofocus Pomodoro Timer now includes a flexible theme system built with CSS variables, making it easy to add new themes based on your preferences.

## Current Themes

### Light Theme (Glassy)
- Beautiful glassmorphism design with purple gradient background
- Translucent glass cards with backdrop blur effects
- Soft white floating objects

### Dark Theme
- Dark blue-gray gradient background
- Darker glass cards with subtle transparency
- Indigo and purple accent colors
- Perfect for nighttime focus sessions

## How to Add a New Theme

### Method 1: Using CSS (Recommended for permanent themes)

1. Open `styles.css`
2. Add a new theme block after the dark theme:

```css
/* Your Custom Theme */
body.ocean-theme {
    --bg-gradient-start: #0077be;
    --bg-gradient-end: #00a8e8;
    --glass-bg: rgba(255, 255, 255, 0.15);
    --glass-border: rgba(255, 255, 255, 0.25);
    --glass-shadow: rgba(0, 119, 190, 0.37);
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.9);
    --card-bg: rgba(0, 168, 232, 0.12);
    --card-border: rgba(255, 255, 255, 0.18);
    --accent-primary: #00a8e8;
    --accent-secondary: #0096d6;
    --timer-text: #00a8e8;
    --timer-bg: rgba(255, 255, 255, 0.95);
    --mode-badge-bg: rgba(0, 168, 232, 0.15);
    --mode-badge-text: #00a8e8;
    --info-label: rgba(0, 168, 232, 0.7);
    --info-value: #00a8e8;
    --input-bg: rgba(255, 255, 255, 0.9);
    --input-border: rgba(0, 168, 232, 0.3);
    --input-text: #333;
    --float-object: rgba(255, 255, 255, 0.12);
    --float-triangle: rgba(255, 255, 255, 0.1);
    --progress-bg: rgba(0, 168, 232, 0.15);
    --progress-bar: #00a8e8;
    --btn-primary-bg: linear-gradient(135deg, #0077be 0%, #00a8e8 100%);
    --btn-secondary-bg: rgba(0, 168, 232, 0.2);
    --btn-secondary-text: #00a8e8;
}
```

3. Update the theme toggle button in `index.html` to include your new theme
4. Modify the JavaScript in `script.js` to support multiple theme switching

### Method 2: Using JavaScript (For dynamic/runtime themes)

You can use the `addCustomTheme()` method in the ThemeManager class:

```javascript
// Get theme manager instance
const themeManager = new ThemeManager();

// Add a custom theme
themeManager.addCustomTheme('ocean', {
    'bg-gradient-start': '#0077be',
    'bg-gradient-end': '#00a8e8',
    'glass-bg': 'rgba(255, 255, 255, 0.15)',
    'text-primary': '#ffffff',
    'accent-primary': '#00a8e8',
    // ... add all CSS variables
});

// Apply the custom theme
document.body.className = 'ocean-theme';
```

## CSS Variables Reference

### Background & Gradients
- `--bg-gradient-start` - Starting color of background gradient
- `--bg-gradient-end` - Ending color of background gradient

### Glass Effects
- `--glass-bg` - Background for glassy elements
- `--glass-border` - Border color for glass elements
- `--glass-shadow` - Shadow for glass elements

### Text Colors
- `--text-primary` - Primary text color (titles)
- `--text-secondary` - Secondary text color (subtitles)

### Cards & Panels
- `--card-bg` - Background for timer card and settings panel
- `--card-border` - Border color for cards

### Accent Colors
- `--accent-primary` - Primary accent color
- `--accent-secondary` - Secondary accent color

### Timer Specific
- `--timer-text` - Color of the countdown timer
- `--timer-bg` - Background behind timer
- `--mode-badge-bg` - Background of mode indicator
- `--mode-badge-text` - Text color of mode indicator

### Info & Labels
- `--info-label` - Color for info labels (Session, Completed)
- `--info-value` - Color for info values (numbers)

### Inputs
- `--input-bg` - Background for input fields
- `--input-border` - Border color for inputs
- `--input-text` - Text color in inputs

### Floating Objects
- `--float-object` - Color of floating circles and rectangles
- `--float-triangle` - Color of floating triangles

### Progress Ring
- `--progress-bg` - Background of progress circle
- `--progress-bar` - Foreground of progress circle

### Buttons
- `--btn-primary-bg` - Background for primary button
- `--btn-secondary-bg` - Background for secondary buttons
- `--btn-secondary-text` - Text color for secondary buttons

## Theme Ideas

Here are some theme ideas you can implement:

1. **Forest Theme** - Green gradients with nature-inspired colors
2. **Sunset Theme** - Orange, pink, and purple warm tones
3. **Ocean Theme** - Blues and teals with aqua accents
4. **Rose Gold Theme** - Soft pinks and gold accents
5. **Midnight Theme** - Deep blacks and blues with neon accents
6. **Autumn Theme** - Warm browns, oranges, and reds
7. **Monochrome Theme** - Black, white, and grays
8. **Cyberpunk Theme** - Neon greens, pinks, and dark backgrounds

## Tips for Creating Themes

1. **Maintain Contrast**: Ensure text is readable against backgrounds
2. **Test Both States**: Check how your theme looks in focus and break modes
3. **Glass Effect**: Keep transparency values between 0.1-0.3 for best glass effect
4. **Blur Effects**: The backdrop-filter blur is set in CSS, but colors should complement it
5. **Gradients**: Use smooth gradients (2-3 colors max) for best visual effect
6. **Accessibility**: Ensure sufficient contrast ratios for text readability

## Example: Adding a Multi-Theme Selector

To add a theme selector dropdown instead of just a toggle:

1. Add HTML:
```html
<select id="themeSelector">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="ocean">Ocean</option>
    <option value="forest">Forest</option>
</select>
```

2. Update JavaScript:
```javascript
document.getElementById('themeSelector').addEventListener('change', (e) => {
    const theme = e.target.value;
    document.body.className = theme === 'light' ? '' : `${theme}-theme`;
    localStorage.setItem('theme', theme);
});
```

3. Add corresponding CSS theme blocks for each option

---

Enjoy customizing your Pomodoro timer! 🎨
