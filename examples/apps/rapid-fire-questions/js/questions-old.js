var questions = [
  "Texting or talking?",
  "Favorite day of the week?",
  "Favorite city in U.S. besides the one you live in?",
  "Nickname your parents used to call you?",
  "Last song you downloaded?",
  "Would you rather be able to speak every language in the world or be able to talk to animals?",
  "Favorite holiday?",
  "How long does it take you to get ready?",
  "Scale of 1-10, how good of a driver are you?",
  "Fill in the blank: Taylor Swift is _________.",
  "At what age do you want to retire?",
  "Invisibility or super strength?",
  "Is it wrong for a vegetarian to eat animal crackers?",
  "Scale of 1-10, how good are you at keeping secrets?",
  "Ariel or Jasmine?",
  "First celebrity crush?",
  "Dawn or dusk?",
  "If you could travel back in time, what period would you go to?",
  "Do you snore?",
  "Place you most want to travel?",
  "Favorite junk food?",
  "Favorite childhood TV show?",
  "Favorite season?",
  "Last Halloween costume?",
  "Cake or pie?",
  "Do you ever post inspirational quotes on social media?",
  "Favorite ice cream flavor?",
  "Say a word in Spanish.",
  "Do you believe in fate?",
  "Favorite number?",
  "Who has it easier—men or women?",
  "Have you ever worn socks with sandals?",
  "Name a primate besides monkeys and apes.",
  "Why can't we tickle ourselves?",
  "What does a person need to be happy?",
  "Is there such thing as objective beauty?",
  "What is the best age?",
  "If Voldemort offered you a hug, would you accept?",
  "Is double dipping at a party ever acceptable?",
  "Virtue or sin?",
  "Sourdough or wheat?",
  "Would you rather cuddle with a baby panda or a baby penguin?",
  "Are lifeguards attractive?",
  "Name one of the seven dwarfs.",
  "Would you want to live forever?",
  "What's for dinner tonight?",
  "How many pull-ups can you do in a row?",
  "Favorite type of tea?",
  "Are reindeers real creatures?",
  "Say something in an Asian language.",
  "Do you respect Kanye West?",
  "What's the fastest speed you've ever driven in a car?",
  "Cake or pie?",
  "Godfather or Star Wars?",
  "How many times did you sneeze in the last 7 days?",
  "Do you like the word <dapper>?",
  "Big dogs or small dogs?",
  "How many hours of sleep do you need?",
  "Are women complicated?",
  "Say <G'day mate> in an Australian accent.",
  "How often is it healthy to cry?",
  "What is your favorite carb: bread, pasta, rice, or potatoes?",
  "If you could ask God one question, what would it be?",
  "Stale sour patch kids or fresh circus peanuts?",
  "Paper or plastic?",
  "How many kids would you like to have?",
  "Are rats cute?",
  "Are you politically correct?",
  "What's your favorite car?",
  "Do you know how to salsa dance?",
  "What does the acronym SCUBA stand for?",
  "Scale of 1 to 10, how good are you at wiffleball?",
  "Do you believe in love at first sight?",
  "How many cups of coffee do you drink per day?",
  "What's your ideal outside temperature?",
  "If everyone in the world had to get married when they reached a certain age, what would that age be?",
  "Have you ever slapped someone in the face?",
  "Favorite type of muffin?",
  "Giving presents or getting presents?",
  "If you had a child, what you want them to be the most popular person in their high school?",
  "Make a high pitched sound.",
  "From 1-10, how hot do you like your shower water?",
  "If Kim Kardashian and Donald Trump were both drowning and you could only save one, who would it be?",
  "Do you like the smell of gasoline?",
  "Can you touch your toes without bending your knees?",
  "Do you like the name Charlie for a girl?",
  "Do you know the definition of trisca-deca-phobia?",
  "Have you ever tasted soap?",
  "If you were given an all-expenses paid trip to Cleveland, would you take it?",
  "Do you currently own any stuffed animals?",
  "What is the maximum number of spritzes of perfume before it is too much?",
  "Tapas or pasta?",
  "Ask permission or beg forgiveness?",
  "If the toilet paper roll is really low but not completely out, do you replace it or leave it for someone else?",
  "How many redheads are you friends with?",
  "What is the type of triangle with 2 equal sides called again?",
  "What is your favorite carnival food?",
  "Name a word that starts with the letter Q.  ",
  "Climb a mountain or jump from a plane?",
  "If you were really hungry, would you eat a bug?",
  "Did you go to sleepaway summer camp as a kid?",
  "How long can you hold your breath for?",
  "Have you ever seen a kangaroo in person?",
  "When people stand up for a standing ovation, are you usually one of the earlier people to stand up or one of the later?",
  "What type of milk do you put in your cereal?",
  "Would you rather be besties with Beyonce or Rihanna?",
  "What is the capital of New York?",
  "Did you ever believe in Santa Claus?",
  "Are dogs people?",
  "Have you ever been to Africa?",
  "Would you eat a day-old taquito from 7-11?",
  "What is the most number of hours you’ve watched TV in a single day?",
  "Do you Instagram your food?",
  "What sound does a seal make?",
  "Would you rather lose all your hair or gain 50% more hair?",
  "Do you have any friends taller than 6’4?",
  "If there is a spider in your house, do you kill it or set it free?",
  "What is something you could eat for a week straight?",
  "Would you rather wake up to an air horn blowing in your ear every day, or wake up and have to run 4 miles every day?",
  "Is Jimmy Kimmel funny?",
  "Dark Chocolate or Milk Chocolate?",
  "Say something cool.",
  "Polka dots or stripes?",
  "Would you go to a movie alone?",
  "What is a country you’d be okay never visiting in your life?",
  "Would you rather eat some smoky gnocchi or some delish fish?",
  "If you were given the opportunity to fly into space given today's technology, would you take it?",
  "For a journal: paper or computer?",
  "Is a human life more valuable than the life of a dog?",
  "Most embarrassing store you might be seen shopping at?",
  "Is it grammatically proper to capitalize the names of seasons?",
  "Would you rather come face to face with a miniature hippopotamus or a giant cockroach? Both are in a bad mood.",
  "Define the word “zeitgeist”",
  "When was the last time you stayed up past 4 in the morning?",
  "What is the lamest “dessert” that people try to pass off as a dessert?",
  "When you fly on a plane, do you wear a neck pillow?",
  "Do you like Disneyland?",
  "How would you rate your karaoke skills on a scale of 1 to Mariah Carey?",
  "What is the name of the street you grew up on?",
  "Are your grandparents mildly rude?",
  "What is your favorite clothing brand?",
  "Black beans or refried beans in your burrito?",
  "Using an Elmo voice, tell me how you like your coffee.",
  "Are tomatoes a fruit or a vegetable?",
  "Who is your favorite Harry Potter character?",
  "Have you ever stolen anything?",
  "Do you think anyone considers you a hipster?",
  "What is the sound you would make if you were freezing cold?",
  "When eating a formal meal with multiple forks, do you start from the outside or inside?",
  "What is your favorite martial art?",
  "LA or New York?",
  "Sour Patch Kids or Swedish Fish?",
  "Scale of 1-10, how good are you at trivia?",
  "Super Mario Brothers or Zelda?",
  "If Tupac appeared before you right now, what is the first thing you would ask him?",
  "What temperature do you like your thermostat at?",
  "Do you own a bicycle?",
  "Do you find handlebar moustaches to be handsome?",
  "What is wind?",
  "Which animal adds more joy to the world, squirrels or llamas?",
  "On a scale of 1-10 how much do you enjoy garlic?",
  "Who inspires you?",
  "If you could push a button and make everyone in the world 7% happier but it would also place a worldwide ban on all hair styling products, would you push it?",
  "If there was a hair in your soup at a restaurant, would you return it?",
  "What is the most boring thing ever?",
  "Tell me what you like to do on weekends—in a valley girl voice.",
  "What size bed do you prefer?",
  "What is your middle name?",
  "How do you feel about cranberrie"
]
