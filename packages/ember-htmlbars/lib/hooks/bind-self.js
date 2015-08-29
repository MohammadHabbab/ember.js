/**
@module ember
@submodule ember-htmlbars
*/

import ProxyStream from 'ember-metal/streams/proxy-stream';

export default function bindSelf(env, scope, _self) {
  let self = _self;

  if (self && self.hasBoundController) {
    let { controller } = self;
    self = self.self;

    scope.bindLocal('controller', newStream(controller || self));
  }

  if (self && self.isView) {
    scope.bindLocal('view', self, 'view');
    scope.bindLocal('controller', self.getKey('controller'));

    if (self.isGlimmerComponent) {
      scope.bindSelf(newStream(self, ''));
    } else {
      scope.bindSelf(newStream(self.getKey('context'), ''));
    }

    return;
  }

  let selfStream = newStream(self, '');
  scope.bindSelf(selfStream);

  if (!scope.hasLocal('controller')) {
    scope.bindLocal('controller', selfStream);
  }
}

function newStream(newValue, key) {
  return new ProxyStream(newValue, key);
}
