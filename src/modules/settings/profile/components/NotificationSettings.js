import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import { Header, PageContent } from 'modules/layout/components';
import { ContentBox, SubHeading, InlineItems, SubItem } from '../../styles';
import Sidebar from 'modules/settings/Sidebar';

class NotificationSettings extends Component {
  constructor(props) {
    super(props);

    // on notif type change
    this.onTypeChange = this.onTypeChange.bind(this);

    this.onEmailConfigChange = this.onEmailConfigChange.bind(this);
  }

  onTypeChange(e) {
    // save config
    this.props.saveNotificationConfigurations({
      notifType: e.target.value,
      isAllowed: e.target.checked
    });
  }

  onEmailConfigChange(e) {
    // save get notification by email config
    this.props.configGetNotificationByEmail({ isAllowed: e.target.checked });
  }

  isChecked(notifType) {
    const oldEntry = this.props.configs.find(
      config => config.notifType === notifType.name
    );

    // if no previous configuration found then default is checked
    if (!oldEntry) {
      return true;
    }

    return oldEntry.isAllowed;
  }

  renderNotifType(type, key) {
    return (
      <InlineItems key={key}>
        <Toggle
          value={type.name}
          checked={this.isChecked(type)}
          onChange={this.onTypeChange}
          icons={{
            checked: null,
            unchecked: null
          }}
        />
        {type.text}
      </InlineItems>
    );
  }

  renderModule(module, mindex) {
    return (
      <SubItem key={mindex}>
        <SubHeading>{module.description}</SubHeading>
        {module.types.map((type, index) =>
          this.renderNotifType(type, `${mindex}${index}`)
        )}
      </SubItem>
    );
  }

  render() {
    const content = (
      <ContentBox>
        <SubHeading>Notifications</SubHeading>
        <InlineItems>
          <Toggle
            defaultChecked={this.props.getNotificationByEmail}
            onChange={this.onEmailConfigChange}
            icons={{
              checked: null,
              unchecked: null
            }}
          />
          Get notification by email
        </InlineItems>
        <ContentBox>
          {this.props.modules.map((module, index) =>
            this.renderModule(module, index)
          )}
        </ContentBox>
      </ContentBox>
    );

    const breadcrumb = [
      { title: 'Settings', link: '/settings' },
      { title: 'Notification settings' }
    ];

    return [
      <Header key="breadcrumb" breadcrumb={breadcrumb} />,
      <Sidebar key="sidebar" />,
      <PageContent key="settings-content">{content}</PageContent>
    ];
  }
}

NotificationSettings.propTypes = {
  modules: PropTypes.array.isRequired,
  configs: PropTypes.array.isRequired,

  // save notification configurations
  saveNotificationConfigurations: PropTypes.func.isRequired,

  // save get notification by email action
  configGetNotificationByEmail: PropTypes.func.isRequired,

  // previously configured value
  getNotificationByEmail: PropTypes.bool.isRequired
};

export default NotificationSettings;
