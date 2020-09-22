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

class Typeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  handleInputChange = (e) => {
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
  };

  handleSuggestionSelected(value) {
    // Set text value and reset state when user selects a suggestion
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  renderMatchedSuggestions() {
    // Destructure
    const { suggestions } = this.state;
    const { text } = this.state;
    //console.log({ text, suggestions });

    // If no suggestions, return null
    if (suggestions.length === 0) {
      return null;
    }

    // Map through suggestions in state
    // Check for onclick, pass selected suggestion to handleInputChange
    const regex = new RegExp(`${text}`, "gi");
    const suggestionList = suggestions.map((color, i) => {
      const bolded = color.toString().replace(regex, "<b>" + text + "</b>");
      console.log(bolded);

      return (
        <ul className="suggestions">
          <li
            key={i}
            onClick={() => this.handleSuggestionSelected(color)}
            dangerouslySetInnerHTML={{ __html: bolded }}
          ></li>
        </ul>
      );
    });
    return suggestionList;
  }

  render() {
    const { text } = this.state;
    return (
      <div className="container" ref={this.container}>
        <form className="search-form">
          <input
            value={text}
            onChange={this.handleInputChange}
            type="text"
            className="search"
            placeholder="Color Search"
          />
          {this.renderMatchedSuggestions()}
        </form>
      </div>
    );
  }

  // clearSuggestions = (e) => {
  //   // if (this.container.current && !this.container.current.contains(e.target)) {
  //   //   this.setState(() => ({
  //   //     text: "",
  //   //     suggestions: [],
  //   //   }));
  //   // }
  // };

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.clearSuggestions);
  // }
}

ReactDOM.render(
  <Typeahead list={colorsList} />,
  document.getElementById("root")
);

// console.log(bolded);
// if (suggestions) {
// for (let i = 0; i < suggestions.length; i++) {
//   // console.log(suggestions[i]);
//   const color = suggestions[i].toLowerCase();
//   const bolded =
//     color.slice(0, color.indexOf(text)) +
//     "<b>" +
//     text +
//     "</b>" +
//     color.slice(color.indexOf(text) + text.length, color.length);
//   console.log(bolded);

//   return (
//     <ul className="suggestions">
//       <li onClick={() => this.handleSuggestionSelected(suggestions[i])}>
//         <span dangerouslySetInnerHTML={{ __html: bolded }}></span>
//       </li>
//     </ul>
//   );
// }

//   return (
//     <ul className="suggestions">
//       {suggestions.map((color, i) => (
//         <li key={i} onClick={() => this.handleSuggestionSelected(color)}>
//           {color}
//         </li>
//       ))}
//     </ul>
//   );
// }

// return (
//   <ul className="suggestions">
//     {suggestions.map((color, i) => (
//       <li
//         key={i}
//         onClick={() => this.handleSuggestionSelected(color)}
//         dangerouslySetInnerHTML={{ __html: bolded }}
//       ></li>
//     ))}
//   </ul>
// );

// const bolded =
//   suggestions.slice(0, suggestions.indexOf(text)) +
//   "<b>" +
//   text +
//   "</b>" +
//   suggestions.slice(
//     suggestions.indexOf(text) + text.length,
//     suggestions.length
//   );
// console.log(bolded);

// return (
//   <ul className="suggestions">
//     {suggestions.map((color, i) => (
//       <li key={i} onClick={() => this.handleSuggestionSelected(color)}>
//         <span dangerouslySetInnerHTML={{ __html: bolded }}></span>
//       </li>
//     ))}
//   </ul>
// );

// return (
//   <ul className="suggestions">
//     {suggestions.map((color, i) => (
//       <li key={i} onClick={() => this.handleSuggestionSelected(color)}>
//         <span dangerouslySetInnerHTML={{ __html: bolded }}></span>
//       </li>
//     ))}
//   </ul>
// );
