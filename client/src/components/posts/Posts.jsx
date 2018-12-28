import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends PureComponent {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {};

export default Posts;
