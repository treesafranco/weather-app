import React, { Component } from "react";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);

    this.touchstartX = 0;
    this.touchendX = 0;

    this.mouseStartX = 0;
    this.mouseEndX = 0;
    this.mouseStartY = 0;
    this.isDragging = false;

    this.defaultWidth = 0;
    this.totalItems = 0;
    
    this.state = {
      activeIndex: 0,
      sliderWidth: 0
    };
  }

  componentDidMount() {
    this.wrapperRef.addEventListener("touchstart", e => {
        this.touchstartX = e.changedTouches[0].screenX;
      },
      false
    );

    this.wrapperRef.addEventListener("touchend", e => {
        this.touchendX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      false
    );

    this.wrapperRef.addEventListener("mousedown", e => {
        e.preventDefault();
        this.mouseStartX = e.pageX;
        this.isDragging = false;
      },
      false
    );

    this.wrapperRef.addEventListener("mousemove", e => {
        if (!(e.pageX === this.mouseStartX && e.pageY === this.mouseStartY)) {
          this.isDragging = true;
        }},
      false
    );

    this.wrapperRef.addEventListener("mouseup", e => {
        if (this.isDragging) {
          this.mouseEndX = e.pageX;
          this.handleDrag();
        }
        this.isDragging = false;
        this.mouseStartX = 0;
        this.mouseStartY = 0;
      },
      false
    );
    
    this.setState({
      sliderWidth: this.wrapperRef.offsetWidth
    })
  }

  componentDidUnMount() {
    this.wrapperRef.removeEventListner("touchstart");
    this.wrapperRef.removeEventListner("touchend");
    this.wrapperRef.removeEventListner("mouseup");
    this.wrapperRef.removeEventListner("mousedown");
    this.wrapperRef.removeEventListner("mousemove");
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleSwipe = () => {
    if (this.touchendX < this.touchstartX) {
      this.slideToLeft();
    }

    if (this.touchendX > this.touchstartX) {
      this.slideToRight();
    }
  };

  handleDrag = () => {
    if (this.mouseEndX < this.mouseStartX) {
      this.slideToLeft();
    }
    if (this.mouseEndX > this.mouseStartX) {
      this.slideToRight();
    }
  };

  slideToLeft = () => {
    if (this.state.activeIndex < this.totalItems - 1) {
      this.setState(prevState => ({
        activeIndex: prevState.activeIndex + 1
      }));
    }
  };

  slideToRight = () => {
    if (this.state.activeIndex > 0) {
      this.setState(prevState => ({
        activeIndex: prevState.activeIndex - 1
      }));
    }
  };

  dotClickHandler = e => {
    this.setState({
      activeIndex: parseInt(e.target.id)
    });
  };

  render() {
    let children = React.Children.toArray(this.props.children);
    this.totalItems = children.length;
    let dots = [];

    for (let i = 0; i < this.totalItems; i++) {
      dots.push(
        <span id={i}
          key={i}
          className={`dot ${this.state.activeIndex === i ? "active" : ""}`}
          onClick={this.dotClickHandler}
        />
      );
    }

    return (
      <div className="slider" ref={this.setWrapperRef}>
        <div className="slider-content"
          style={{
            width: this.state.sliderWidth * this.totalItems + "px",
            transform: "translateX(" + this.state.activeIndex * -this.state.sliderWidth + "px)"
          }}>
          {children &&
            children.map((item, index) => {
              return (
                <div key={index}
                  className="slider-item"
                  style={{ width: this.state.sliderWidth }}>
                  {item}
                </div>
              );
            })}
        </div>
        <div className="slider-control">{dots}</div>
      </div>
    );
  }
}

export default Slider;
