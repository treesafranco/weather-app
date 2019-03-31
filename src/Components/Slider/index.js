import React, { Component } from "react";

import Spinner from "../Spinner";

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

    this.totalCards = 3;
    this.state = {
      activeIndex: 0
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
    if (this.state.activeIndex < this.totalCards - 1) {
      this.setState(
        prevState => {
          return { activeIndex: prevState.activeIndex + 1 };
        },
        () => this.slideCards()
      );
    }
  };

  slideToRight = () => {
    if (this.state.activeIndex > 0) {
      this.setState(
        prevState => ({
          activeIndex: prevState.activeIndex - 1
        }),
        () => this.slideCards()
      );
    }
  };

  dotClickHandler = e => {
    this.setState({
        activeIndex: parseInt(e.target.id)
      },
      () => this.slideCards()
    );
  };

  slideCards = () => {
    const element = document.getElementById("slider_content");
    element.style.transform = "translateX(" + this.state.activeIndex * -315 + "px)";
  };

  render() {
    let dots = [];
    for (let i = 0; i < this.totalCards; i++) {
      dots.push( <span id={i} 
        key={i}
        className={`dot ${this.state.activeIndex === i ? "active" : ""}`}
        onClick={this.dotClickHandler}/>
      );
    }

    return (
      <div id="slider"
        className={this.props.loading ? "loading" : ""}
        ref={this.setWrapperRef}>
        <div id="slider_control">{dots}</div>
        <div id="slider_content">{this.props.children}</div>
        {this.props.loading ? (
          <div id="slider_loader">
            <Spinner />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Slider;
