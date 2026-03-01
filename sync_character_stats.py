
import sqlite3
import json
import os
import random

# --- CONFIGURATION ---
DB_PATH = 'war_of_sound_game.db'
JSON_PATH = r'fandom-site/src/data/characterStats.json'
SOURCE_JSON_PATH = 'characters.json'

# --- STAT & MOVE GENERATION ---

def get_elemental_classification(desc_str):
    desc_lower = desc_str.lower() if desc_str else ''
    if any(k in desc_lower for k in ['fire', 'ember', 'flame', 'magma', 'scorch']): return 'Fire'
    if any(k in desc_lower for k in ['water', 'tidal', 'liquid', 'abyss', 'drowning']): return 'Water'
    if any(k in desc_lower for k in ['lightning', 'thunder', 'static', 'volt', 'energy']): return 'Electric'
    if any(k in desc_lower for k in ['earth', 'stone', 'seismic', 'ground', 'titan', 'quake']): return 'Earth'
    if any(k in desc_lower for k in ['wind', 'air', 'cyclone', 'storm', 'hurricane']): return 'Wind'
    if any(k in desc_lower for k in ['ice', 'frost', 'zero', 'frozen']): return 'Ice'
    if any(k in desc_lower for k in ['poison', 'toxic', 'venom', 'acid']): return 'Poison'
    if any(k in desc_lower for k in ['shadow', 'silent', 'void', 'dark', 'night', 'stealth']): return 'Shadow'
    if any(k in desc_lower for k in ['light', 'lux', 'radiant', 'holy', 'seraph']): return 'Light'
    if any(k in desc_lower for k in ['psychic', 'mind', 'illusion', 'memory', 'dream', 'psycho']): return 'Psychic'
    if any(k in desc_lower for k in ['glitch', 'sync', 'digital', 'reality', 'system', 'cyber']): return 'System'
    return 'Neutral'

def generate_stats(char):
    stats = {'hp': 60, 'bpm': 60, 'db': 60, 'hz': 60, 'sync': 60, 'level': 1}
    desc_lower = (str(char.get('role', '')) + str(char.get('desc', ''))).lower()

    if any(k in desc_lower for k in ['tank', 'titan', 'enforcer', 'juggernaut', 'colossal', 'battering ram', 'armored']):
        stats['hp'] += 25; stats['db'] += 15; stats['bpm'] -= 15
    if any(k in desc_lower for k in ['assassin', 'speed', 'agile', 'fast', 'ninja', 'executioner', 'blade']):
        stats['bpm'] += 25; stats['sync'] += 15; stats['hp'] -= 10
    if any(k in desc_lower for k in ['commander', 'leader', 'tactician', 'master', 'strategist', 'overseer']):
        stats['hz'] += 15; stats['sync'] += 15
    if any(k in desc_lower for k in ['psychic', 'mind', 'illusion', 'manipulator', 'prophet', 'seer', 'choir']):
        stats['hz'] += 25; stats['db'] -= 10
    if any(k in desc_lower for k in ['elemental', 'mutation', 'fissure', 'core', 'abomination']):
        stats['db'] += 10; stats['hz'] += 10; stats['hp'] += 5

    level = 1
    rank = char.get('rank')

    if rank is not None:
        try:
            rank_num = int(rank)
            if char['faction'] == 'Sick 52':
                if rank_num == 52: level = 100
                else: level = 70 + int((52 - rank_num) / 2.5)
            elif char['faction'] == 'DJ24':
                if rank_num == 1: level = 95
                elif rank_num <= 4: level = 85 + (4 - rank_num) * 2
                else: level = 60 + (24 - rank_num)
        except (ValueError, TypeError):
             level = 50 # Default for non-numeric ranks like 'Elite'

    if char.get('faction') == 'Elite Command Circle': level = 80 + random.randint(0, 5)
    if char.get('faction') == 'The Actual 24': level = 90 + random.randint(0, 8)

    stats['level'] = min(max(int(level), 1), 100)
    
    for key in ['hp', 'bpm', 'db', 'hz', 'sync']:
        stats[key] += int(stats['level'] / 4)
        stats[key] = min(max(stats[key] + random.randint(-7, 7), 15), 100)
        
    return stats

def generate_moves(char):
    element = get_elemental_classification(str(char.get('desc', '')) + str(char.get('role', '')))
    role = (str(char.get('role', '')) + str(char.get('title', ''))).lower()
    
    patterns = {
        'default': [("Sonic Pulse", "A focused blast of sound energy."), ("Phase Shift", "Briefly become intangible to dodge an attack."), ("Resonant Shield", "A defensive barrier that dampens incoming attacks."), ("Overdrive", "Temporarily boost all stats."), ("Final Drop", "A high-energy ultimate attack.")],
        'Fire': [("Ember Shot", "Launches a volley of fiery projectiles."), ("Flame Wall", "Creates a searing barrier of fire."), ("Scorched Earth", "Incinerates the ground, causing damage over time."), ("Solar Flare", "A blinding flash that stuns opponents."), ("Inferno Overload", "Ultimate: Engulfs the area in an unstoppable firestorm.")],
        'Water': [("Aqua Jet", "A high-speed tackle made of water."), ("Tidal Barrier", "Summons a wall of water to block attacks."), ("Drowning Pool", "Creates a vortex that pulls in and damages foes."), ("Abyssal Armor", "Reduces damage taken and regenerates health."), ("Tsunami Crash", "Ultimate: Summons a colossal wave to crush everything.")],
        'Electric': [("Thunder Shock", "A quick jolt of electricity."), ("Lightning Rod", "Absorbs an incoming energy attack to boost power."), ("Static Field", "An area that slows and damages enemies."), ("Volt Switch", "Swap positions with a burst of speed."), ("Gigavolt Havoc", "Ultimate: Calls down a massive lightning strike.")],
        'Earth': [("Stone Fist", "A powerful punch with the force of rock."), ("Seismic Shield", "Erects a barrier of solid earth."), ("Earthquake", "Shakes the ground violently, knocking down opponents."), ("Titan's Strength", "Massively boosts attack power for a short time."), ("Gaia's Wrath", "Ultimate: The very ground erupts to attack your foe.")],
        'Wind': [("Gale Strike", "A blade of wind that strikes from a distance."), ("Cyclone Defense", "A vortex of wind that deflects projectiles."), ("Air Cutter", "Unleashes multiple sharp blades of air."), ("Tailwind", "Greatly increases speed and evasion."), ("Hurricane Blast", "Ultimate: Creates a devastating hurricane centered on the user.")],
        'Ice': [("Frostbite", "An icy touch that slows opponents."), ("Glacial Wall", "Forms a thick barrier of ice."), ("Absolute Zero", "Freezes a target solid for a short time."), ("Ice Body", "Gradually regenerates health in a chilled state."), ("Diamond Dust", "Ultimate: A storm of razor-sharp ice crystals.")],
        'Shadow': [("Silent Strike", "An attack that cannot be predicted or heard."), ("Void Cloak", "Become invisible for a short duration."), ("Nightmare", "Traps a foe in a horrifying illusion."), ("Shadow Drain", "Siphons life force from the enemy."), ("Umbral Evisceration", "Ultimate: A single, fatal blow from the darkness.")],
        'Psychic': [("Mind Spike", "A direct assault on the target's mind."), ("Precognitive Dodge", "Automatically evade the next incoming attack."), ("Telekinetic Throw", "Hurls environmental objects at the foe."), ("Mental Barrier", "A shield that is impervious to special attacks."), ("Psycho Break", "Ultimate: Shatters the target's will to fight.")],
        'System': [("Glitch Fire", "An unpredictable burst of digital energy."), ("Firewall", "A digital shield that blocks incoming data/special attacks."), ("Reality Defrag", "Restores health and removes negative statuses."), ("Packet Loss", "Causes the opponent's next move to fail."), ("Blue Screen of Death", "Ultimate: Traps the enemy in a system crash, disabling them completely.")]
    }
    
    moves = list(patterns.get(element, patterns['default']))
    
    if any(k in role for k in ['assassin', 'blade', 'executioner']): moves[0] = ("Execution", "A high-damage finishing move against weakened opponents.")
    elif any(k in role for k in ['tank', 'titan', 'juggernaut']): moves[2] = ("Unstoppable Force", "Charge forward, ignoring all crowd control effects.")
    elif any(k in role for k in ['commander', 'leader']): moves[3] = ("Rallying Cry", "Boosts the morale and stats of all allies.")
        
    return moves[:5]

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS moves')
    cursor.execute('DROP TABLE IF EXISTS characters')
    cursor.execute('''
    CREATE TABLE characters (
        slug TEXT PRIMARY KEY, name TEXT, level INTEGER, element TEXT,
        hp INTEGER, bpm INTEGER, db INTEGER, hz INTEGER, sync INTEGER
    )''')
    cursor.execute('''
    CREATE TABLE moves (
        id INTEGER PRIMARY KEY AUTOINCREMENT, character_slug TEXT, name TEXT, description TEXT,
        FOREIGN KEY(character_slug) REFERENCES characters(slug)
    )''')
    conn.commit()
    return conn

def populate_database(conn, characters):
    cursor = conn.cursor()
    char_rows, move_rows = [], []
    for char_data in characters:
        slug = char_data.get('slug')
        if not slug: continue
        stats = generate_stats(char_data)
        element = get_elemental_classification(str(char_data.get('desc', '')) + str(char_data.get('role', '')))
        char_rows.append((slug, char_data['name'], stats['level'], element, stats['hp'], stats['bpm'], stats['db'], stats['hz'], stats['sync']))
        moves = generate_moves(char_data)
        for move_name, move_desc in moves:
            move_rows.append((slug, move_name, move_desc))
    cursor.executemany('INSERT OR REPLACE INTO characters VALUES (?,?,?,?,?,?,?,?,?)', char_rows)
    cursor.executemany('INSERT INTO moves (character_slug, name, description) VALUES (?,?,?)', move_rows)
    conn.commit()
    print(f"Populated database with {len(char_rows)} characters and {len(move_rows)} moves.")

def export_to_json(conn):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM characters')
    stats_json = {}
    for row in cursor.fetchall():
        slug, name, level, element, hp, bpm, db, hz, sync = row
        stats_json[slug] = {'name': name, 'level': level, 'element': element, 'hp': hp, 'bpm': bpm, 'db': db, 'hz': hz, 'sync': sync, 'moves': []}
        cursor.execute('SELECT name, description FROM moves WHERE character_slug = ?', (slug,))
        for m_row in cursor.fetchall():
            stats_json[slug]['moves'].append({'name': m_row[0], 'desc': m_row[1]})
    with open(JSON_PATH, 'w') as f: json.dump(stats_json, f, indent=2)
    print(f"Exported stats for {len(stats_json)} characters to {JSON_PATH}")

if __name__ == "__main__":
    print("Starting character data generation from characters.json...")
    try:
        with open(SOURCE_JSON_PATH, 'r', encoding='utf-8') as f:
            all_characters = json.load(f)
        
        connection = init_db()
        populate_database(connection, all_characters)
        export_to_json(connection)
        connection.close()
        print("Data generation complete.")
    except FileNotFoundError:
        print(f"Error: {SOURCE_JSON_PATH} not found. Run extractData.js first.")
    except Exception as e:
        print(f"An error occurred: {e}")

