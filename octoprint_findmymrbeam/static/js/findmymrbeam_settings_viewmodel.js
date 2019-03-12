$(function () {
    function FindmymrbeamSettingsViewModel(params) {
        var self = this;
        self.settings = params[0];

        self.name = ko.observable(null);
        self.uuid = ko.observable(null);
        self.registered = ko.observable(null);
        self.ping = ko.observable(false);
        self.public_ip = ko.observable(null);
        self.find_url = ko.computed(function(){
            return "https://find.mr-beam.org"
                +"?name=" + encodeURIComponent(self.name())
                +"&uuid=" + encodeURIComponent(self.uuid())
                +"&public_ip=" + encodeURIComponent(self.public_ip())
                ;
        });


        self.onAllBound = function () {
            self.name(self.settings.settings.plugins.findmymrbeam.name());
            self.uuid(self.settings.settings.plugins.findmymrbeam.uuid());
            self.registered(self.settings.settings.plugins.findmymrbeam.registered());
            self.ping(self.settings.settings.plugins.findmymrbeam.ping());
        };

        self.onDataUpdaterPluginMessage = function (plugin, data) {
            if (plugin !== "findmymrbeam" || !data) return;
            if ('name' in data) {
                self.name(data['name']);
            }
            if ('uuid' in data) {
                self.uuid(data['uuid']);
            }
            if ('registered' in data) {
                self.registered(data['registered']);
            }
            if ('ping' in data) {
                self.ping(data['ping']);
            }
            if ('public_ip' in data) {
                self.public_ip(data['public_ip']);
            }
        };


    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        FindmymrbeamSettingsViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        ["settingsViewModel"],

        // e.g. #settings_plugin_mrbeam, #tab_plugin_mrbeam, ...
        ["#settings_plugin_findmymrbeam"]
    ]);
});
