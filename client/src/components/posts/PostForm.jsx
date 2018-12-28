import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends PureComponent {
  state = { text: '', errors: {} };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.errors, prevProps.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { auth, addPost } = this.props;
    addPost({
      text: this.state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    });
    this.setState({ text: '' });
  };

  render() {
    const { text, errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors
});

const mapDispatchToProps = {
  addPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
