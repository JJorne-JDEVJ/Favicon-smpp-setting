
//TODO: make this better
function config_menu() {
  let conf = get_config();
  let cmd_list = Object.keys(conf);
  dmenu(cmd_list, function (cmd, shift) {
    conf[cmd] = dmenu([], function (val, shift) {
      conf[cmd] = val;
      set_config(conf);
    }, "value:")
  }, "config: ");
}

document.addEventListener("keyup", function (e) {
  if (e.target != undefined && e.target.tagName === "INPUT") {
    return
  }
  if (e.key == ':') {
    let cmd_list = Object.keys(vakken).concat(Object.keys(goto_items).concat(["classroom", "onshape", "dmenu config", "config", "scores", "set theme v2", "lock dmenu", "unbloat", "clearsettings", "discord"]));
    dmenu(cmd_list, function (cmd, shift) {
      switch (cmd) {
        case "lock dmenu":
          lock_dmenu = !lock_dmenu;
          return;
        case "unbloat":
          unbloat();
          return;
        case "set background":
          dmenu([], function (url) {
            set_background(url);
            store_background(url);
          }, "bg url:");
          return;
        case "config":
          config_menu();
          return;
        case "scores":
          show_scores();
        case "dmenu config":
          dconfig_menu();
          return;
        case "classroom":
          open_url("https://classroom.google.com", shift);
          return;
        case "onshape":
          open_url("https://onshape.com", shift);
          return;
        case "discord":
          open_url("https://discord.gg/TCBgGxUP", shift);
          return;

        case "clearsettings":
          clearsettings()
          return;

        default:
          break;
      }
      let got_url = goto_items[cmd]
      if (got_url != null) {
        open_url(got_url, shift);
        return;
      }
      let vakken_url = vakken[cmd];
      if (vakken_url != null) {
        open_url(vakken_url, shift);
        return;
      }
    }, "quick:");
  }
});
