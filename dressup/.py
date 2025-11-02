# --- Game Data based on DN Articles ---
BAD_COSTUMES = [
    "1", # Sports Jersey/Athlete 
    "2", # Angel or Devil 
    "3", # Kiss, Marry, Kill Trio (as one option) 
    "4"  # Lifeguard 
]

# --- Game Logic ---
def start_game():
    print("---------------------------------------------------------")
    print("        WELCOME TO HALLOWEEKEND SURVIVAL: DN JUDGMENT")
    print("---------------------------------------------------------")
    print("It's Halloweekend! You need a costume for tonight's party.")
    print("Remember: The Daily Nebraskan writers are tired of the same basic ideas.")
    print("\nCHOOSE YOUR COSTUME (Enter the number):")

    # Options List
    print(" [1] Put on your favorite Sports Jersey and call yourself an athlete.") # Bad 
    print(" [2] Go with the classic: Angel Wings and a White Dress.")            # Bad 
    print(" [3] Grab your friends for the Red, White, and Black 'Kiss, Marry, Kill' look.") # Bad 
    print(" [4] The easy college guy option: A Lifeguard whistle and shorts.")    # Bad 
    print(" [5] Find a teal sweater and jeans to be 'Minecraft' Steve.")          # Good [cite: 51, 48]
    print(" [6] Use your black clothes and go as 'Little Red Riding Hood.'")     # Good (Alternative to Devil) 
    print(" [7] Put together a look inspired by an iconic artist like Charli xcx.") # Good 
    print(" [8] A simple, last-minute ghost costume.")                           # Good (Alternative to Angel) 
    print("---------------------------------------------------------")

    choice = input("Your Choice (1-8): ")
    print("---------------------------------------------------------")
    
    # --- JUDGMENT ---
    if choice in BAD_COSTUMES:
        lose_scenario(choice)
    else:
        win_scenario(choice)


def lose_scenario(choice):
    print("❌ JUDGMENT FAILED!")
    if choice == "1":
        print("You wore the Jersey! The DN writer called it 'boring and lazy'  and wishes guys would take Halloween more seriously.")
    elif choice == "2":
        print("Another Angel/Devil! The writers are tired of counting at least 10 of these costumes every year. You lose!")
    elif choice == "3":
        print("Kiss, Marry, Kill! The writer thought it was a one-year trend in 2022 that should have ended by 2025[cite: 12, 13].")
    elif choice == "4":
        print("The Lifeguard costume. The writer says guys are 'taking the easy route' and wants to see more creativity.")
    
    print("\n**RESULT:** You have to go home and try again tomorrow.")


def win_scenario(choice):
    print("✅ JUDGMENT PASSED!")
    if choice == "5":
        print("Minecraft Steve! With the movie releasing this year, your costume is culturally relevant[cite: 49]. The simple teal sweater and jeans nailed the look[cite: 51].")
    elif choice == "6" or choice == "8":
        print("A simple but approved classic! The writer suggested a Ghost or Little Red Riding Hood as great alternatives to the overdone Angel/Devil.")
    elif choice == "7":
        print("Iconic Artist! These costumes are praised for allowing you to show your personality with icons you love[cite: 39]. You get lots of praise!")

    print("\n**RESULT:** You successfully survived Halloweekend! You are praised for your niche idea.")


# Start the game
start_game()
