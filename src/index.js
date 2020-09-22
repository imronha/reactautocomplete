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
      position: 0,
      suggestions: [],
      text: "",
    };
    this.container = React.createRef();
    this.input = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown = (e) => {
    const { position, suggestions } = this.state;

    if (e.keyCode === 9 && position < suggestions.length) {
      // If tab pressed
      this.setState((previousState) => ({
        position: previousState.position + 1,
      }));
      this.input.current.focus();
      e.preventDefault();
    }
    // If tab pressed and end of list reached, restart from 0
    else if (e.keyCode === 9 && position === suggestions.length) {
      this.setState(() => ({
        position: 0,
      }));
      this.input.current.focus();
      e.preventDefault();
    }
    // If shift+tab pressed, focus previous item
    if (e.shiftKey && e.keyCode === 9 && position > 0) {
      this.setState(() => ({
        position: position - 1,
      }));
    }
    // If shift+tab and at suggestions[0], focus on input
    else if (e.shiftKey && e.keyCode === 9 && position === 0) {
      this.setState(() => ({
        position: 0,
        suggestions: [],
      }));
      e.preventDefault();
    }
    if (e.keyCode === 13) {
      // If Enter pressed
      this.setState(() => ({
        position: 0,
        suggestions: [],
        text: suggestions[position],
      }));
      this.input.current.focus();
      e.preventDefault();
    }
  };

  handleUniversalKeydown = (e) => {
    if (e.keyCode === 27) {
      // If ESC pressed
      this.setState(() => ({ position: 0, suggestions: [] }));
    }
  };

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
    this.setState(() => ({ position: 0, suggestions, text: val }));
  };

  handleClick = (e) => {
    console.log(e);
    if (this.input.current.contains(e.target)) {
      this.setState(() => ({
        text: e.target.outerText,
        position: 0,
        suggestions: [],
      }));
    }
    this.setState(() => ({
      position: 0,
      suggestions: [],
    }));
  };

  renderMatchedSuggestions() {
    // Destructure
    const { suggestions } = this.state;
    const { text } = this.state;
    const { position } = this.state;

    // If no suggestions, return null
    if (suggestions.length === 0) {
      return null;
    }

    // Map through suggestions in state
    // Check for onclick, pass selected suggestion to handleInputChange
    const regex = new RegExp(`${text}`, "gi");
    const suggestionList = suggestions.map((color, i) => {
      const bolded = color.toString().replace(regex, "<b>" + text + "</b>");
      return (
        <ul className="suggestions" key={i}>
          <li
            autoFocus
            key={i}
            onClick={() => this.handleClick(color)}
            dangerouslySetInnerHTML={{ __html: bolded }}
            className={position === i ? "active" : null}
          ></li>
        </ul>
      );
    });
    return suggestionList;
  }

  componentDidMount() {
    this.input.current.focus();
    document.addEventListener("keydown", this.handleUniversalKeydown);
    document.addEventListener("mousedown", this.handleClick);
  }

  render() {
    const { text } = this.state;
    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        <form className="search-form" ref={this.input}>
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
}

ReactDOM.render(
  <Typeahead list={colorsList} />,
  document.getElementById("root")
);
