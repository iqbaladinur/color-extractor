# CONTRIBUTE FOR THE CODE
- Please make Pull Request into **develop** branch.
- Please add proper label for issue or PR [label description](https://github.com/iqbaladinur/color-extractor/labels).
- Please describe what you has been changed, for example.
  ```
  #added_palettes
  -
  -
  -
  #added_feature
  -
  -
  -
  #fixed
  -
  -
  -
  etc
  ```

# HOW TO CONTRIBUTE FOR COLOR PALETTES

- Clone this repository. 
  ```bash
  git clone https://github.com/iqbaladinur/color-extractor.git
  ```
- Fetch all. 
  ```bash
  git fetch --all
  ```
- Make new branch from **develop** branch.
  ```bash
  git checkout develop
  git checkout -b feat/add_your_branch_name
  ```
- Add json file with keyword as a name (should be lower case) in this directory ex: `leaf.json`.
- You can added up to 5 color palettes. More than that will break the UI.
- Follow this format:
  ```
  [
    ["#e4aca9ff","#c43232ff","#bb1516ff","#ab1213ff","#ab1314ff"],
    ...
  ]
  ```
- Commit & push your branch.
  ```bash
  git push origin feat/add_your_branch_name
  ```
- Make Pull Request into **develop** branch

# CONTRIBUTE VIA ISSUE
Make issue with [request palette] on the title fox ex: `[request palette] Please add this color palette for 'apple' keyword`. Someone will make pull request for that. 