var threeext = threeext || {};
threeext.$method('extention', function() {
	THREE.$method('$extend', function(a, o) {
		var arg = Array.prototype.slice.call(arguments);
		arg.shift();
		Array.prototype.forEach.call(arg, function(source) {
			for (var property in source) {
				if (a[property] && o[property] && o[property].className && o[property].className.substr(0, 6) === 'THREE.') {
					a[property].copy(o[property]);
				} else {
					a[property] = o[property];
				}
			}
		}, this);
		return a;
	});
	THREE.$method('$add', function(a, o) {
		var arg = Array.prototype.slice.call(arguments);
		arg.shift();
		Array.prototype.forEach.call(arg, function(source) {
			for (var property in source) {
				if (o[property]) {
				} else {
					if (a[property] && o[property] && o[property].className && o[property].className.substr(0, 6) === 'THREE.') {
						a[property].add(o[property]);
					} else {
						a[property] += o[property];
					}
				}
			}
		}, this);
		return a;
	});
	THREE.Mesh.prototype.$method('rotate', function(x, y, z) {this.quaternion.rotate(x, y, z);});
	THREE.Mesh.prototype.$method('move', function(d) {
		this.position.x = d.x;
		this.position.y = d.y;
		this.position.z = d.z;
		return this;
	});
	THREE.Mesh.prototype.$method('deepclone', function () {
		return new this.constructor(this.geometry.clone(), this.material.clone()).copy(this);
	});
	THREE.Mesh.prototype.getter('tweener', function() {
    if (!this._tweener) {
      this._tweener = phina.accessory.Tweener().attachTo(this);
    }
    return this._tweener;
  });
	(function() {
	  var methods = [
	    'addEventListener', 'on',
	    'removeEventListener', 'off',
	    'clearEventListener', 'clear',
	    'hasEventListener', 'has',
	    'dispatchEvent', 'fire',
	    'dispatchEventByType', 'flare',
			'attach', 'attachTo', 'detach',
	  ];
	  methods.each(function(name) {
	    THREE.Mesh.prototype.$method(name, phina.app.Element.prototype[name]);
	  });
	})();
	THREE.Mesh.prototype._listeners = {};
	THREE.Vector3.prototype.className = 'THREE.Vector3';
	THREE.Quaternion.prototype.className = 'THREE.Quaternion';
	THREE.Quaternion.prototype.$method('rotate', function(x, y, z) {
		if (x.className === 'THREE.Quaternion') {
			var qq = x.clone();
			qq.multiply(this.clone());
			this.copy(qq);
		} else {
			this.rotate(new THREE.Quaternion().setFromAxisAngle(Axis.x, x));
			this.rotate(new THREE.Quaternion().setFromAxisAngle(Axis.y, y));
			this.rotate(new THREE.Quaternion().setFromAxisAngle(Axis.z, z));
		}
		return this;
	});
	THREE.PerspectiveCamera.prototype.$method('rotate', function(q) {
		var qq = q.clone();
		qq.multiply(this.quaternion.clone());
		this.quaternion.copy(qq);
	});
	THREE.PerspectiveCamera.prototype.$method('move', function(d) {
		this.position.x = d.x;
		this.position.y = d.y;
		this.position.z = d.z;
	});
	THREE.MultiMaterial.prototype.accessor('opacity', {
		set: function(p) {
			for (var i = 0; i < this.materials.length; i++) {
				this.materials[i].opacity = p;
			}
		},
		get: function() {return this.materials[0].opacity;}
  });
});
