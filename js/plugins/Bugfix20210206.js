

(function() {
	
    PIXI.tilemap.RectTileLayer.prototype.renderWebGL = function (renderer, useSquare) {
        if (useSquare === void 0) { useSquare = false; }
        var points = this.pointsBuf;
        if (points.length === 0)
            return;
        var rectsCount = points.length / 9;
        var tile = renderer.plugins.tilemap;
        var gl = renderer.gl;
        if (!useSquare) {
            tile.checkIndexBuffer(rectsCount);
        }
        var shader = tile.getShader(useSquare);
        var textures = this.textures;
        if (textures.length === 0)
            return;
        var len = textures.length;
        if (this._tempTexSize < shader.maxTextures) {
            this._tempTexSize = shader.maxTextures;
            this._tempSize = new Float32Array(2 * shader.maxTextures);
        }
        for (var i = 0; i < len; i++) {
            if (!textures[i] || !textures[i].valid)
                return;
            var texture = textures[i].baseTexture;
        }
        tile.bindTextures(renderer, shader, textures);
        var vb = tile.getVb(this.vbId);
        if (!vb) {
            vb = tile.createVb(useSquare);
            this.vbId = vb.id;
            this.vbBuffer = null;


            this.vbBufferByteLength = 0;


            this.modificationMarker = 0;
        }
        var vao = vb.vao;
        renderer.bindVao(vao);
        var vertexBuf = vb.vb;
        vertexBuf.bind();
        var vertices = rectsCount * shader.vertPerQuad;
        if (vertices === 0)
            return;
        if (this.modificationMarker != vertices) {
            this.modificationMarker = vertices;
            var vs = shader.stride * vertices;


            var t1 = !this.vbBuffer ? 1 : 0;
            var t2 = this.vbBufferByteLength < vs ? 1 : 0;

            if (t1 + t2 > 0) {


            //if (!this.vbBuffer || this.vbBuffer.byteLength < vs) {
                var bk = shader.stride;
                while (bk < vs) {
                    bk *= 2;
                }
                this.vbBuffer = new ArrayBuffer(bk);


                this.vbBufferByteLength = bk;


                this.vbArray = new Float32Array(this.vbBuffer);
                this.vbInts = new Uint32Array(this.vbBuffer);
                vertexBuf.upload(this.vbBuffer, 0, true);
            }
            var arr = this.vbArray, ints = this.vbInts;
            var sz = 0;
            var textureId, shiftU, shiftV;
            if (useSquare) {
                for (i = 0; i < points.length; i += 9) {
                    textureId = (points[i + 8] >> 2);
                    shiftU = 1024 * (points[i + 8] & 1);
                    shiftV = 1024 * ((points[i + 8] >> 1) & 1);
                    arr[sz++] = points[i + 2];
                    arr[sz++] = points[i + 3];
                    arr[sz++] = points[i + 0] + shiftU;
                    arr[sz++] = points[i + 1] + shiftV;
                    arr[sz++] = points[i + 4];
                    arr[sz++] = points[i + 6];
                    arr[sz++] = points[i + 7];
                    arr[sz++] = textureId;
                }
            }
            else {
                var tint = -1;
                for (i = 0; i < points.length; i += 9) {
                    var eps = 0.5;
                    textureId = (points[i + 8] >> 2);
                    shiftU = 1024 * (points[i + 8] & 1);
                    shiftV = 1024 * ((points[i + 8] >> 1) & 1);
                    var x = points[i + 2], y = points[i + 3];
                    var w = points[i + 4], h = points[i + 5];
                    var u = points[i] + shiftU, v = points[i + 1] + shiftV;
                    var animX = points[i + 6], animY = points[i + 7];
                    arr[sz++] = x;
                    arr[sz++] = y;
                    arr[sz++] = u;
                    arr[sz++] = v;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x + w;
                    arr[sz++] = y;
                    arr[sz++] = u + w;
                    arr[sz++] = v;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x + w;
                    arr[sz++] = y + h;
                    arr[sz++] = u + w;
                    arr[sz++] = v + h;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                    arr[sz++] = x;
                    arr[sz++] = y + h;
                    arr[sz++] = u;
                    arr[sz++] = v + h;
                    arr[sz++] = u + eps;
                    arr[sz++] = v + eps;
                    arr[sz++] = u + w - eps;
                    arr[sz++] = v + h - eps;
                    arr[sz++] = animX;
                    arr[sz++] = animY;
                    arr[sz++] = textureId;
                }
            }
            vertexBuf.upload(arr, 0, true);
        }
        if (useSquare)
            gl.drawArrays(gl.POINTS, 0, vertices);
        else
            gl.drawElements(gl.TRIANGLES, rectsCount * 6, gl.UNSIGNED_SHORT, 0);
    };

})();

