function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Definisi verteks-verteks pada segitiga
    /**
     * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5); D (0.5, 0.5)
     */
    var vertices = [
        //Huruf
        -0.9, 0.9, 1.0, 0.0, 0.0, // Titik A 
        -0.9, -0.9, 0.0, 1.0, 0.0, // Titik B
        -0.5, 0.9, 0.0, 0.0, 1.0, // Titik C
        -0.5, -0.9, 1.0, 1.0, 1.0, // Titik D

        //titik 0
        //outer border
        0.2, 0.9, 1.0, 1.0, 1.0,
        0.7, 0.9, 1.0, 0.0, 1.0,
        0.7, 0.1, 1.0, 1.0, 0.0,
        0.2, 0.1, 0.0, 1.0, 1.0,

        //inner border
        0.3, 0.8, 1.0, 0.0, 0.0,
        0.6, 0.8, 1.0, 0.0, 1.0,
        0.6, 0.2, 1.0, 1.0, 0.0,
        0.3, 0.2, 1.0, 1.0, 1.0,

        //titik 8
        //outer border
        0.2, -0.9, 0.0, 0.0, 1.0,
        0.2, -0.0, 0.0, 1.0, 0.0,
        0.7, -0.0, 0.0, 1.0, 1.0,
        0.7, -0.9, 1.0, 0.0, 0.0,

        // inner border 1
        0.3, -0.1, 1.0, 0.5, 1.0,
        0.3, -0.4, 1.0, 1.0, 0.5,
        0.6, -0.4, 0.5, 1.0, 1.0,
        0.6, -0.1, 1.0, 0.5, 0.5,

        // inner border 2
        0.3, -0.5, 0.5, 1.0, 0.5,
        0.3, -0.8, 0.5, 0.5, 1.0,
        0.6, -0.8, 1.0, 0.5, 0,
        0.6, -0.5, 0.5, 1.0, 0

    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    gl.clearColor(0.0, 0.0, 0.0, 0.8);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(100, 0, canvas.height, canvas.height);

    var primitive = gl.TRIANGLE_STRIP;
    var offset = 0; // Titik Penggambaran
    var count = 4; // Jumlah verteks yang akan digambar
    gl.drawArrays(primitive, offset, count);

    var i = 0;
    while (i != 5) {
        i++;
        primitive = gl.LINE_LOOP;
        offset += 4; // Titik Penggambaran
        count = 4; // Jumlah verteks yang akan digambar
        gl.drawArrays(primitive, offset, count);
    }
}