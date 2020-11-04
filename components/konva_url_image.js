import React from "react";
import Konva from "konva";
import { Image } from "react-konva";

class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image,
    });
    this.imageNode.cache();
    this.imageNode.getLayer().batchDraw();
    this.imageNode.filters(this.props.filters);
  };
  render() {
    return (
      <Image
        draggable={this.props.draggable}
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
        onDragStart={() => {}}
        onDragEnd={() => {}}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
export default URLImage;
