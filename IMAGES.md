# 🖼️ Image Assets

## Where to Find the Images

Due to GitHub repository size limitations, the **200+ high-quality character and location images** (258MB total) are **not included in this repository**.

### Image Locations

The images are available in the following ways:

1. **Live Website**: View all artwork at [dj24.net](http://dj24.net)
2. **Local Development**: Images are stored locally in the `public/images/` directory structure
3. **Production Build**: Images are copied to `dist/images/` during the build process

### Image Structure

```
public/images/
├── dj24/              # 30+ DJ24 character portraits
├── sick52/            # 65+ Sick 52 villain portraits  
├── cities/            # 24 location artworks (2 per city)
├── extended/          # 22 extended cast images
├── harmony-council/   # 7 council member portraits
└── logos/             # 17 faction and city logos
```

### Total Assets

- **30+ DJ24 Character Images** - Full guardian roster
- **65+ Sick 52 Character Images** - Complete villain gallery
- **24 City Location Artworks** - All major cities
- **22 Extended Cast Images** - Elite Command, Operatives, Mythic tier
- **7 Harmony Council Portraits** - All council members
- **17 Faction Logos** - Professional branding

**Total Size:** ~258MB of high-quality PNG artwork

---

## For Developers

If you're running this project locally:

1. The images should be placed in `public/images/` following the structure above
2. During development (`npm run dev`), Vite serves images from `public/`
3. During build (`npm run build`), images are copied to `dist/images/`
4. The application references images using paths like `/images/dj24/character.png`

---

## Image Hosting Options

For production deployment, consider:

- **CDN Hosting** - Upload images to a CDN service
- **External Image Host** - Use services like Imgur, Cloudinary, or AWS S3
- **Git LFS** - Use Git Large File Storage for version control of large assets
- **Separate Asset Repository** - Maintain images in a dedicated repository

---

**Note:** All artwork is original creative content by **petezdj** for the DJ24: War of Sound multimedia franchise.
