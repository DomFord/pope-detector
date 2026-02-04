# Pope Detector - Test Examples

Try pasting these examples into the Pope Detector to test how it works!

## 📜 Example 1: High Pope Score (Expected: 75-85%)

**Religious and Formal Language**

```
We, reflecting upon the sacred duties entrusted to our office, address ourselves 
to you with grave concern. The fundamental principles of our faith call us to examine 
the conditions of our times with both wisdom and charity. In these challenging days, 
we must remain steadfast in our commitment to the universal truths of the Gospel. 
The dignity of the human person must always be upheld and protected. Let all who 
read these words understand that our primary motivation stems from love for God's 
creation and an unwavering dedication to spiritual renewal.
```

## 📜 Example 2: Medium Pope Score (Expected: 45-55%)

**Formal But Less Religious**

```
Good morning everyone. I would like to discuss some important matters that have 
been on my mind lately. First, I want to emphasize the importance of working together 
as a community. When we unite our efforts toward common goals, we can accomplish 
great things. Additionally, I believe we should focus on helping those who are less 
fortunate. Compassion and understanding are values that should guide our actions. 
Finally, I encourage everyone to reflect on their personal beliefs and how they 
shape their decisions.
```

## 📜 Example 3: Low Pope Score (Expected: 10-20%)

**Casual and Modern**

```
Hey! So I was just thinking about how cool it would be if we could all just chill 
out and not worry so much about everything. Like, seriously, people need to relax 
more. I went to this coffee shop today and got this amazing latte. The barista was 
super nice and we talked about random stuff. Then I went shopping and found some 
really nice deals. Later I'm gonna play some video games with my friends. It's 
gonna be lit! Anyway, catch you later dude!
```

## 📜 Example 4: Religious but Non-Papal (Expected: 30-40%)

**Bible Passage**

```
For God so loved the world that he gave his one and only Son, that whoever believes 
in him shall not perish but have eternal life. For God did not send his Son into 
the world to condemn the world, but to save the world through him. Whoever believes 
in him is not condemned, but whoever does not believe stands condemned already because 
they have not believed in the name of God's one and only Son.
```

## 📜 Example 5: Philosophical and Academic (Expected: 50-60%)

**Philosophical Text**

```
Let us consider the nature of truth and how it manifests in human consciousness. 
Throughout history, philosophers have grappled with fundamental questions about 
the human condition and our relationship to the divine. The search for meaning is 
an eternal pursuit, rooted in our capacity for reason and reflection. In examining 
the principles that govern society, we must not lose sight of the transcendent values 
that have sustained civilizations. The moral framework upon which we build our 
institutions should reflect both practical wisdom and spiritual insight.
```

## 📜 Example 6: Modern Religious Writing (Expected: 55-65%)

**Contemporary Christian Reflection**

```
Today, I want to reflect on what it means to live a life of faith in our modern world. 
We face unprecedented challenges, yet the core message of love and redemption remains 
eternal. As followers of Christ, we are called to serve those around us with compassion 
and justice. We must recognize the sacred dignity present in every person we encounter. 
In this age of rapid change, let us hold fast to the values that give our lives meaning 
and purpose. By striving to build a more just society, we fulfill our calling as 
children of God.
```

## 🧪 What to Notice

When you analyze these texts, observe:

1. **Language Formality**: More formal = higher score
2. **Religious References**: Explicit religious language increases score
3. **Ecclesiastical Terms**: Words like "apostolic," "papal," "ecclesiastical" boost scores
4. **Sentence Structure**: Complex, eloquent sentences are more "papal"
5. **Themes**: Faith, morality, doctrine, love, peace = higher scores
6. **Vocabulary**: Academic and archaic terms = higher scores

## 🎯 Try Creating Your Own

Write your own text and see how papal it is! Think about:
- What makes something sound official and formal?
- How does religious terminology affect the score?
- Can you write non-religious text that scores high? Why or why not?
- What's the minimum changes needed to increase the score by 10%?

## 📊 Expected Results

Based on the TF-IDF algorithm used:

| Text Type | Expected Score |
|-----------|-----------------|
| Papal document excerpt | 85%+ |
| Formal religious writing | 60-80% |
| Mixed formal/religious | 40-60% |
| Formal non-religious | 30-50% |
| Casual writing | 10-30% |
| Completely informal | 0-15% |

## 💡 Tips for High Scores

To maximize your "pope-ness" score:
1. Use formal, eloquent language
2. Include religious/spiritual references
3. Discuss moral and ethical principles
4. Use complex sentence structures
5. Reference faith, God, Church, doctrine
6. Adopt an authoritative tone
7. Focus on universal or transcendent themes
8. Use Latin phrases if possible!

## 🔬 Technical Details

The analysis looks at:
- **Term Frequency**: How often words appear
- **Inverse Document Frequency**: How unique words are
- **Cosine Similarity**: Angle between text vectors

Words that appear frequently in papal documents but rarely elsewhere have the highest weight!

---

Have fun testing! See if you can write text that breaks 90%! 🙏
