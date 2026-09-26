const OCCASIONS = {
  birthday: ['{name}, I have known you for {years} and I still could not tell you your favourite colour, but I can tell you this.', 'They say you should never trust anyone over {age}. {name}, I am about to make an exception.', 'Every year {name} gets a year older and every year the rest of us get a little luckier.', '{name}, there are people who make a room better by being in it. I looked it up. It is you.', 'I was asked to keep this short. {name} was not consulted.', 'To {name}: proof that some things improve with age and the rest of us should stop worrying.'],
  wedding: ['I have known {name} long enough to know two things: this is a good idea, and I should not be the one giving the speech.', '{name} once told me they would never settle down. I would like to enter that into the record.', 'They say you marry your best friend. {name}, I checked, and I am still available, so this must be love.', 'To {name}: for finding someone who laughs at the same things. That is rarer than it sounds.', 'Marriage, they say, is finding the one person you want to annoy for the rest of your life. {name}, congratulations on your choice.', 'I have seen {name} choose a restaurant. It takes an hour. This decision, I am told, took no time at all.'],
  leaving: ['{name} is leaving, which means the rest of us will finally have to learn how the printer works.', 'To {name}, who made Monday mornings bearable and Friday afternoons dangerous.', 'There is a rule that you should never say goodbye at these things. {name}, we are going to break it.', '{name} arrived not knowing where the kitchen was. {name} leaves knowing where everything is, including the bodies.', 'Some people do the job. {name} made the job worth turning up for.', 'I asked around for a story about {name} that we could tell in public. This is the only one.'],
  anniversary: ['To {name}, who has put up with a great deal and still laughs at the same jokes.', 'They say the first year is the hardest. {name}, we would like to know what you are doing differently.', 'Some couples finish each other’s sentences. These two start each other’s arguments, and end them laughing.', '{name}, another year, and you still save each other the last bite. That is the whole thing, really.', 'To {name} and to anniversaries: the only exam you pass by not noticing you are taking it.', 'I have known {name} through several haircuts and one very long renovation. This, by contrast, has been easy.'],
  baby: ['To {name}, who has not slept since Tuesday and has never looked happier.', '{name}, they say it takes a village. Look around. This is the village. We are terrible at it, but we are here.', 'A toast to {name}: for the smallest person in the room and the biggest change in it.', 'Somewhere in this house there is a very small person who will one day roll their eyes at {name}. Until then, this.', 'To {name}: sleep is temporary. This is not.', 'They say children keep you young. {name}, we will check back in eighteen years.'],
  home: ['To {name}, and to the first of many arguments about where the big spoon lives.', '{name} has a home. The rest of us have a place to leave our coats.', 'A house is walls. A home is when {name} makes tea without asking how you take it.', 'To {name}: may the neighbours be quiet, the boiler be kind, and the door always be open to this lot.', 'They say home is where the heart is. {name}, it is also where the boxes are. Both are true tonight.', 'To {name}, who moved house and somehow kept all the friends. Impressive on both counts.'],
  retirement: ['{name} is retiring, which the rest of us are choosing to see as a warning.', 'To {name}: for {years} of showing up, and for finally not having to.', 'They say you should retire when you can still enjoy it. {name}, we have never seen you not enjoy something.', 'Retirement is a full-time job with no manager. {name}, you are going to be excellent at it.', 'To {name}, who taught half the people in this room and put up with the other half.', 'Some people leave a job. {name} leaves a shape in it that no one else will fit.'],
  because: ['I was not planning to make a speech. Then I looked at {name} and thought, why not.', 'To {name}: no occasion, no reason, just a room full of people who are glad you are here.', 'They say you should tell people what they mean to you while they are in the room. {name}, you are in the room.', 'This toast is for {name}, for nothing in particular, which is the best reason there is.', 'To {name}, who is the reason at least three people here know each other.', 'It is a Tuesday and {name} is here and honestly that is enough for a glass.'],
};
const LABELS = { birthday: 'Birthday', wedding: 'Wedding', leaving: 'Leaving do', anniversary: 'Anniversary', baby: 'New baby', home: 'New home', retirement: 'Retirement', because: 'Just because' };
const $ = (s) => document.querySelector(s);
const bind = (n) => $(`[data-bind="${n}"]`);
let occasion = 'birthday';
let last = -1;
const grid = $('#occasions');
for (const k of Object.keys(OCCASIONS)) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = `btn min-h-12 text-[15px] ${k === occasion ? 'btn-primary' : ''}`; b.dataset.k = k; b.textContent = LABELS[k];
  b.addEventListener('click', () => { occasion = k; [...grid.children].forEach((x) => x.classList.toggle('btn-primary', x === b)); });
  grid.append(b);
}
function line() {
  const list = OCCASIONS[occasion];
  let i;
  do i = Math.floor(Math.random() * list.length); while (i === last && list.length > 1);
  last = i;
  const name = $('#f').name.value.trim() || 'you';
  return list[i].replaceAll('{name}', name).replaceAll('{years}', 'years').replaceAll('{age}', 'thirty');
}
$('#f').addEventListener('submit', (e) => { e.preventDefault(); bind('line').textContent = line(); bind('out').hidden = false; bind('out').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
$('[data-action="another"]').addEventListener('click', () => (bind('line').textContent = line()));
