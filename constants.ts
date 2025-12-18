export const BANGBOO_STYLE_PROMPT = `
  Analyze the uploaded image carefully. Your task is to reimagine the subject (person, animal, or object) as a "Bangboo" character from the game Zenless Zone Zero.
  
  KEY VISUAL TRAITS OF A BANGBOO:
  1. Anatomy: Small, stout, cylindrical/bean-shaped robotic body. Arms are EXTREMELY short, simple cylinders without distinct elbows, attached high on the body. They function more like nubs or handles. Legs are tiny rounded stubs. The overall proportion is chibi-like and non-human.
  2. Head: The "face" is integrated into the rounded top of the body, featuring a black digital screen showing distinctive glowing yellow ring-shaped eyes. There is NO mouth or nose on the face screen.
  3. Ears: Two long, rabbit-like mechanical ears on top. These often act as handles or sensors.
  4. Texture: High-quality matte plastic, metal joints, slightly worn industrial look (scratches, stickers).
  5. Aesthetic: Cyberpunk, streetwear, industrial mascot.

  INSTRUCTIONS:
  - CRITICAL: ARMS MUST BE TINY. They should NOT have elbows or defined muscles. They are short, simple tubes attached to the upper body. DO NOT generate human-proportioned arms.
  - CRITICAL: The face screen MUST display two large, glowing yellow rings for eyes.
  - CRITICAL: The character MUST NOT have a mouth or nose. The face is a smooth black screen with only eyes.
  - CRITICAL: The character MUST be ASEXUAL and ANDROGYNOUS. It is a robot. DO NOT generate any sexual characteristics (no breasts, no hips, no gendered anatomy).
  - Identify the key colors, clothing, and distinctive features of the user's image.
  - Translate these features onto the Bangboo body. 
  - If the user is human, turn their outfit into the Bangboo's "skin" or casing paint job. 
  - If they wear glasses, put digital glasses on the screen face or physical goggles.
  - CREATIVE ADAPTATION:
    - ROLE & FUNCTION (REQUIRED): Analyze the context to assign a specific "Function" to this Bangboo (e.g., Gamer, Chef, Mechanic, Artist).
    - UNIQUE PROP (REQUIRED): Based on the assigned role, generate at least one distinct mechanical tool, weapon, or external attachment (e.g., a robotic arm holding an item, a floating drone, a specialized backpack, a tail plug). This MUST be a physical object, not just a pattern.
    - Accessories: Turn backpacks into mechanical jetpacks or battery packs. Turn hats into custom casing modifications or helmets.
    - Items: Turn handheld items into integrated Bangboo tools, weapons, or props.
    - Details: Use patterns from the input image as decals, stickers, or graffiti on the Bangboo's metal shell.
    - Exaggerate: If the subject has defining traits (e.g., a scarf, headphones, specific hairstyle), reimagine them as oversized or mechanical parts of the Bangboo.
  - Maintain the mood of the original image.
  
  OUTPUT FORMAT:
  Return ONLY a detailed image generation prompt. Do not add conversational text. The prompt should start with: "A high-quality 3D render of a custom Bangboo character from Zenless Zone Zero..."
`;

export const MOOD_OPTIONS = [
  { id: 'default', label: 'Original Match', icon: '😐' },
  { id: 'happy', label: 'Hyper Happy', icon: '😆' },
  { id: 'grumpy', label: 'Grumpy/Serious', icon: '😠' },
  { id: 'combat', label: 'Combat Ready', icon: '⚔️' },
  { id: 'lazy', label: 'Lazy/Sleepy', icon: '💤' },
];

export const STYLE_OPTIONS = [
  { id: '3d', label: 'Cel-Shaded 3D', icon: '🧊' },
  { id: 'flat', label: 'Flat 2D', icon: '🎨' },
];
