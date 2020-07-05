# 0.2.1.0
    Added support for filtering items based on name, book, and setting
    Cleaned up item picker CSS a bit
# 0.2.0.0
    Added pre-major version number (0) to indicate major UI changes vs code changes
    Several breaking changes to the code revolving around converting to an [nx](https://nx.dev) project and supporting typescript
    Several minor bug fixes that got highlighted due to typescript support
    Added Discord link to loading screen in case the app got stuck loading for some reason (so people would know where to find us)
# 1.8.0
    Added support for Keyforge, Keyforge talents
    Added support for choosing multiple skills from a list in an archetype when being provided one by default
# 1.7.5
    fixed the career skills modifier on Equipment
# 1.7.4
    added check to stop duplicate data import
# 1.7.3
    SOTB equipment
# 1.7.2
    SOTB Talents
# 1.7.1
    SOTB Skills and Careers
# 1.7.0
    cleanin up constructor mishaps
    cleanup custom data initStates
    SotB Archetypes
# 1.6.18
    fix customMotivations
# 1.6.17
    fixed talent selection
# 1.6.16
    removed cutsom settings
    migrated custom motivations
    removed the last of the old customdata framework
# 1.6.15
    skills and talents to new structure
# 1.6.14
    fixed customdata merging on top of each other and causing duplicate stats
    sorted custom stuffs
# 1.6.13
    fixed ave human/career skills bug 
# 1.6.12
    fixed merging of custom objects
# 1.6.11
    fixed preq talents
# 1.6.10
    fixed Grit
# 1.6.9
    fixed a career bug (i dun copied it wrong)
# 1.6.8
    weapons, armor, gear to new struture
# 1.6.7
    fixes gear dice
# 1.6.6
    moved customCareers to new db structure
    use .find() in chageState reducer now
# 1.6.5
    rewrote all selectors
    moved customArchetypeTalents to new db structure
    fixed customArchetype not saving skills or abilities
# 1.6.4
    fixed vehicles
# 1.6.3
    fixed prereq ranked issues
# 1.6.2
    removed setting filter until i fix it
    custom archetypes only need name to create
# 1.6.1
    moved customArchetypes to new system
    rebuilt import/export (sorta)
    + bootstrap@4.2.1
    + react-transition-group@2.5.2
    + ajv@6.6.2
    + popper.js@1.14.6
    + react-dom@16.7.0
    + react@16.7.0
    + core-js@2.6.1
    + react-ga@2.5.6
    + react-scripts@2.1.2
    + firebase@5.7.2
# 1.6.0
    custom vehicles
    removed strict
# 1.5.9
    -detach listeners on logout
    -username display on signout button
# 1.5.8
    -fixed soak, WT, and ST for custom gear

# 1.5.7
    -new bitchin' icon!

# 1.5.6
    -PWA!
    -fixed motivation block on mobile

# 1.5.5
    -updated firestore rules
    -fixed import/export page a bit

# 1.5.4
    -updated import for JSON objects
    -fixed screw implants again
    -VEHICLES!  (ALL THREE OF THEM)
    -fancy loading screen
    -figured out how to breakout css

# 1.5.3
    -UserDB init

# 1.5.2
    -lots of formatting

# 1.5.1
    -all the auths

# 1.5.0
    -fixed user page
     -adding vehicles
     -phone auth
# 1.4.5
    -moved configs to .env

# 1.4.4
    -added Char to talent modifier list
    -added char to talentSelection printout

# 1.4.3
    -stated vehicles
    -removed test theme references

#v1.4.2
    -new user image

#v1.4.1
    -themes!
    + deepmerge@2.2.1
    + reactstrap@6.5.0
    + firebase@5.5.3
    + @firebase/firestore@0.8.3
    + react-bootstrap-typeahead@3.2.4


#v1.4.0
    -redid EVERY SINGLE SVG
    -built more theme stuff
    -added theme fonts

#v1.3.10
    -swapped encumbrance/max
    -added encumbrance to printout

#v1.3.9
    -added threshold stat blocks
    -added version# readout

#v1.3.8
    -slimmed down data index
    -started structure for themes
    -fixed setting to careers

#v1.3.7
    -fixed a dumb import flub
    -fixed missing images in archetype
    -JSON all data

#v1.3.6
    -fixed the crap job of importing settings

#v1.3.5
    -move images inside of src/
    -npm updated

#v1.3.4
    -simplified divs in skillblock and skillrow
    -color-adjust: exact;//:For Firefox printing?
    -simplified the talent pyramid in print

#v1.3.3
    -removed a layer of div
    -switched to svg
    -fixed a ton of formatting that i screwed up
    -lower case on desc symbols
    -updated
           + react-dom@16.5.2
           + sockjs-client@1.3.0
           + react@16.5.2
           + ajv@6.5.4
           + firebase@5.5.1

#v1.3.2
    -array check for displaying settings

#v1.3.1
    -prettied up the import/export module
    -added bulk settings maker
    -added .sort().join(', ') to all the setting displays
    -added a merge and sort when adding setting to customItems
    -moved Settingbuilder to CustomData/
    -community links
