1.  What is the language accepted by the automaton in the figure below?
The language accepted by the automaton consists of all input strings that lead from the start state to one of the accepting states.
In this case it's 
```
{
xεε,
xzyε,
εyε,
εεεεxεε,
εεεεxzyε,
εεεεεyε,
εεεεεεεεxεε,
εεεεεεεεxzyε,
εεεεεεεεεyε,
...
}
```


2. Show that it is not deterministic
One of the rules of deterministic automata is following
> No ε-Transitions: A DFA does not allow transitions without consuming an input symbol (i.e., ε-transitions).

The other rule is
> Single Transition per Symbol: For each state and input symbol, there is exactly one transition to another state.


3.  Determinise it.
In file `determinised_automata.drawio`