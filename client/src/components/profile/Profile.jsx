import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { handle } = this.props.match.params;

    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
