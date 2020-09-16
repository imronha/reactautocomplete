import React from "react";
import ReactDOM from "react-dom";

const colorsList = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

export default class Typeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onInputChanged = (e) => {
    const { list } = this.props;
    // If nothing is inputted, set state to nothing
    const val = e.target.value;
    let suggestions = [];

    // Check if input matches an item from colorlist
    // Set matched item to suggestion state and text value state
    if (val.length > 0) {
      const regex = new RegExp(`${val}`, "gi");
      suggestions = list.sort().filter((color) => regex.test(color));
    }
    this.setState(() => ({ suggestions, text: val }));

    // if (val.length === 0) {
    //   this.setState(() => ({
    //     suggestions: [],
    //   }));
    // } else {
    //   // Check if input matches an item from colorlist
    //   // Set matched item to suggestion state and text value
    //   const regex = new RegExp(`${val}`, "gi");
    //   const suggestions = list.sort().filter((color) => regex.test(color));
    //   this.setState(() => ({ suggestions, text: val }));
    // }
  };

  renderMatchedSuggestions() {
    // Desctructure
    const { suggestions } = this.state;
    const { text } = this.state;
    //console.log({ text, suggestions });

    // If no suggestions, return null (null renders nothing)
    if (suggestions.length === 0) {
      return null;
    }

    // Map through suggestions in state
    // Check for onclick, pass selected suggestion to onInputChanged
    const regex = new RegExp(`${text}`, "gi");
    // const bolded = suggestions
    //   .toString()
    //   .replace(regex, `<span className="bolded">${text}</span>`);

    // if (text) {
    //   let index = text.toLowerCase().indexOf()
    // }
    return (
      <ul className="suggestions">
        {suggestions.map((color, i) => (
          <li key={i} onClick={() => this.suggestionSelected(color)}>
            {color}
          </li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
    // Set text value and reset state when user selects a suggestion
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <form className="search-form">
          <input
            value={text}
            onChange={this.onInputChanged}
            type="text"
            className="search"
            placeholder="Color Search"
          />
          {this.renderMatchedSuggestions()}
        </form>
      </div>
    );
  }
}

// function Typeahead() {
//   // function findMatches(wordInput, colorsList) {
//   //   return colorsList.filter((color) => {
//   //     // here we need to figure out if the city or state matches what was searched
//   //     const regex = new RegExp(wordInput, "gi");
//   //     return color.match(regex);
//   //   });
//   // }
//   // function displaySuggestions() {}

//   return (
// <div>
//   {console.log(colorsList)}
//   <form className="search-form">
//     <input type="text" className="search" placeholder="Color Search" />
//     <ul className="suggestions">
//       {colorsList.map((color, i) => (
//         <li key={i}> {color}</li>
//       ))}
//     </ul>
//   </form>
// </div>
//   );
// }

ReactDOM.render(
  <Typeahead list={colorsList} />,
  document.getElementById("root")
);
