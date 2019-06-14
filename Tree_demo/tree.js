//****** Generate data for the tree *************

/*var data = [
    { "name" : "Level 2: A", "parent":"Top Level" },
    { "name" : "Top Level", "parent":"null" },
    { "name" : "Son of A", "parent":"Level 2: A" },
    { "name" : "Daughter of A", "parent":"Level 2: A" },
    { "name" : "Level 2: B", "parent":"Top Level" }
  ];*/
var data = [{ "name" : "Title 1", "parent":"Subject 0" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Subject 0" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Title 0" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Length 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Title 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Length 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Year 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Length 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Year 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Actor 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Year 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Actor 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actress 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Actor 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Actress 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Director 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Actress 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Director 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Popularity 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Awards", "parent":"Popularity 1" },{ "name" : "Awards 1", "parent":"Director 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Popularity", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Popularity 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Awards", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Awards", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Awards", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Awards", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Awards", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Awards", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Awards", "parent":"Director 1" },{ "name" : "Awards 1", "parent":"Popularity 0" },{ "name" : "Subject", "parent":"Awards 1" },{ "name" : "Title", "parent":"Awards 1" },{ "name" : "Length", "parent":"Awards 1" },{ "name" : "Year", "parent":"Awards 1" },{ "name" : "Actor", "parent":"Awards 1" },{ "name" : "Actress", "parent":"Awards 1" },{ "name" : "Director", "parent":"Awards 1" },{ "name" : "Subject 1", "parent":"Awards 0" },{ "name" : "Title", "parent":"Subject 1" },{ "name" : "Length", "parent":"Subject 1" },{ "name" : "Year", "parent":"Subject 1" },{ "name" : "Actor", "parent":"Subject 1" },{ "name" : "Actress", "parent":"Subject 1" },{ "name" : "Director", "parent":"Subject 1" },{ "name" : "Popularity", "parent":"Subject 1" },{ "name" : "Title 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Title 1" },{ "name" : "Length", "parent":"Title 1" },{ "name" : "Year", "parent":"Title 1" },{ "name" : "Actor", "parent":"Title 1" },{ "name" : "Actress", "parent":"Title 1" },{ "name" : "Director", "parent":"Title 1" },{ "name" : "Popularity", "parent":"Title 1" },{ "name" : "Length 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Length 1" },{ "name" : "Title", "parent":"Length 1" },{ "name" : "Year", "parent":"Length 1" },{ "name" : "Actor", "parent":"Length 1" },{ "name" : "Actress", "parent":"Length 1" },{ "name" : "Director", "parent":"Length 1" },{ "name" : "Popularity", "parent":"Length 1" },{ "name" : "Year 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Year 1" },{ "name" : "Title", "parent":"Year 1" },{ "name" : "Length", "parent":"Year 1" },{ "name" : "Actor", "parent":"Year 1" },{ "name" : "Actress", "parent":"Year 1" },{ "name" : "Director", "parent":"Year 1" },{ "name" : "Popularity", "parent":"Year 1" },{ "name" : "Actor 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Actor 1" },{ "name" : "Title", "parent":"Actor 1" },{ "name" : "Length", "parent":"Actor 1" },{ "name" : "Year", "parent":"Actor 1" },{ "name" : "Actress", "parent":"Actor 1" },{ "name" : "Director", "parent":"Actor 1" },{ "name" : "Popularity", "parent":"Actor 1" },{ "name" : "Actress 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Actress 1" },{ "name" : "Title", "parent":"Actress 1" },{ "name" : "Length", "parent":"Actress 1" },{ "name" : "Year", "parent":"Actress 1" },{ "name" : "Actor", "parent":"Actress 1" },{ "name" : "Director", "parent":"Actress 1" },{ "name" : "Popularity", "parent":"Actress 1" },{ "name" : "Director 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Director 1" },{ "name" : "Title", "parent":"Director 1" },{ "name" : "Length", "parent":"Director 1" },{ "name" : "Year", "parent":"Director 1" },{ "name" : "Actor", "parent":"Director 1" },{ "name" : "Actress", "parent":"Director 1" },{ "name" : "Popularity", "parent":"Director 1" },{ "name" : "Popularity 1", "parent":"Awards 0" },{ "name" : "Subject", "parent":"Popularity 1" },{ "name" : "Title", "parent":"Popularity 1" },{ "name" : "Length", "parent":"Popularity 1" },{ "name" : "Year", "parent":"Popularity 1" },{ "name" : "Actor", "parent":"Popularity 1" },{ "name" : "Actress", "parent":"Popularity 1" },{ "name" : "Director", "parent":"Popularity 1" },{ "name" : "Subject 0", "parent":"Racine" },{ "name" : "Title 0", "parent":"Racine" },{ "name" : "Length 0", "parent":"Racine" },{ "name" : "Year 0", "parent":"Racine" },{ "name" : "Actor 0", "parent":"Racine" },{ "name" : "Actress 0", "parent":"Racine" },{ "name" : "Director 0", "parent":"Racine" },{ "name" : "Popularity 0", "parent":"Racine" },{ "name" : "Awards 0", "parent":"Racine" },{ "name" : "Racine", "parent":"null" }];
    var dataMap = data.reduce(function(map, node) {
     map[node.name] = node;
     return map;
    }, {});
    var treeData = [];
    data.forEach(function(node) {
     // add to parent
     var parent = dataMap[node.parent];
     if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
       // add node to child array
       .push(node);
     } else {
      // parent is null or missing
      treeData.push(node);
     }
    });

// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}
