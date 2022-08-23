{
  "targets": [
    {
      "target_name": "tcp_data",
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "sources": [ "tcp_data.cc" ],
      "defines": [ "NAPI_DISABLE_CC_EXCEPTIONS" ],
    }
  ]
}
