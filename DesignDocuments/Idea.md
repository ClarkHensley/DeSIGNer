# Context

CSE 4533 Game Design Game Jam Game

Theme: Signs

# Initial Idea:

I wanted to make a game that I would enjoy. Thus, the goal is to make something based on logic and abstract concepts, rather than quick thinking and physical coordination.

So, my first idea: move shapes of different sizes and colors into their correct "Homes."

Each shape would have multiple qualities (shape, fill color, border color, symbol written on it, etc), and would need to move along a path to be sorted.

Signs at intersections in the path would contain 2 rules, and shapes would move based on these rules.

The goal is to filter shapes into the proper channel so that they reach their "Home."

# Update #1:

This is somewhat akin to a tower defense game, but I don't want to add a time limit. What do we do to make the shapes have to interact with the world?

# Update #2:

So, let's suppose N shapes are generated with m qualities. A number of homes are generated, and each shape must move to a home that it matches (So a green square with purple border can move to the green home, the square home, or the purple border home). A number of valid homes are generated, to ensure that each generated shape has at least 1 home.

Then, we'll generate a path, a simple tree structure.

# Update #3:

To cap off day 1 of development, I think it makes sense for this to effectively be a game-implementation of a binary search tree. Each item will traverse the tree by arbitrary boolean implications.

So, the plan going forward: On each level, generate a number of shapes which will try to go home when you release them. Set up If/Else Signs at intersections to funnel them and get them home.

# Update #4:

The map is effectively a binary tree. It might make sense to balance it in the future, but that would require more positioning math. But now each node knows which children it has, so a token can move along the paths.

Next step, generate the correct homes based on the types of tokens (Finish the types of tokens!), and then we'll make sure they move as they're supposed to.

# Update #5:

The random generation is mostly working. All types of token are working. I still need to add the movement along the path, the signs, the actual DeSIGNer, the movement waiting track, the win/lose conditions, the start screen, and the instructions.

Idea: Homes should have a max capacity. That will make this much more interesting.

# Update #6:

I hit the jackpot. After generating homes, we'll create the Pieces with superfluous other values. This way, there is always at least 1 solution to the level, but this makes it a real puzzle.

