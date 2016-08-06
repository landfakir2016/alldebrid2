'use strict';
import { flow } from 'jsonpipe';

const api = {
  login: '/api/login/',
  logout: '/api/logout/',
  unlock: '/api/unlock',
  unrestrict: '/api/unrestrict',
  torrents: '/api/torrents',
  removeTorrents: '/api/torrents/remove'
};
/* @ngInject */
function apiFactory ($q, http) {

  const loginErrors = response => {
    let error;
    switch (response.data.code) {
    case 1000: error = { code: 'invalidPassword' }; break;
    default: error = { code: 'unexpectedError' };
    }
    return $q.reject(error);
  };

  function login (username, password) {
    return http({
      method: 'POST',
      url: api.login,
      data: { username, password }
    }).catch(loginErrors);
  }

  function loginRecaptcha (username, password, challenge, response) {
    return http({
      method: 'POST',
      url: api.login,
      data: { username, password, recaptcha: { challenge, response } }
    }).catch(loginErrors);
  }

  function unlock (data) {
    return http({
      method: 'POST',
      url: api.unlock,
      data
    });
  }

  function logout () {
    return http({
      method: 'POST',
      url: api.logout
    });
  }

  function torrents (success, error, complete) {
    flow('/api/torrents', { delimiter: '\n\n', success, error, complete });
  }

  function addTorrents (links) {
    return http({
      method: 'POST',
      url: api.torrents,
      data: { links }
    });
  }

  function unrestrict (links) {
    return http({
      method: 'POST',
      url: api.unrestrict,
      data: { links }
    });
  }

  function removeTorrents (torrents) {
    return http({
      method: 'POST',
      url: api.removeTorrents,
      data: { torrents }
    });
  }

  return {
    login,
    loginRecaptcha,
    unlock,
    logout,
    addTorrents,
    removeTorrents,
    torrents,
    unrestrict
  };
}

export default apiFactory;
