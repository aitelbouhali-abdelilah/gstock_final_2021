<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Le following language lines contain Le default error messages used by
    | Le validator class. Some of Lese rules have multiple versions such
    | as Le size rules. Feel free to tweak each of Lese messages here.
    |
    */

    'accepted' => ' :attribute doit etre accepted.',
    'accepted_if' => ' :attribute doit être accepté lorsque :other vaut :value.',
    'active_url' => ' :attribute n\'est pas une URL valide.',
    'after' => ' :attribute doit être une date postérieure à :date.',
    'after_or_equal' => ' :attribute doit être une date postérieure ou égale à :date.',
    'alpha' => ' :attribute ne doit contenir que des lettres.',
    'alpha_dash' => ':attribute :attribut ne doit contenir que des lettres, des chiffres, des tirets et des traits de soulignement.',
    'alpha_num' => ':attribute ne doit contenir que des lettres et des chiffres.',
    'array' => ':attribute doit être un tableau.',
    'before' => ':attribute doit être une date avant :date.',
    'before_or_equal' => ':attribute doit être une date antérieure ou égale à :date.',
    'between' => [
        'numeric' => ':attribute Doit être entre :min et :max.',
        'file' => ':attribute Doit être entre :min and :max kilobytes.',
        'string' => ':attribute Doit être entre :min and :max caractères.',
        'array' => ':attribute Doit être entre :min and :max éléments.',
    ],
    'boolean' => ':attribute le champ doit être vrai ou faux.',
    'confirmed' => ':attribute la confirmation ne correspond pas.',
    'current_password' => 'Le mot de passe est incorrect.',
    'date' => ':attribute Ce n\'est pas une date valide.',
    'date_equals' => ':attribute doit être une date égale à :date.',
    'date_format' => ':attribute ne correspond pas au format :format.',
    'different' => ':attribute et :other doit être différent.',
    'digits' => ':attribute doit être :digits chiffres.',
    'digits_between' => ':attribute Doit être entre :min et :max digits.',
    'dimensions' => ':attribute a des dimensions d\'image non valides.',
    'distinct' => ':attribute le champ a une valeur en double.',
    'email' => ':attribute doit être une adresse e-mail valide.',
    'ends_with' => ':attribute doit se terminer par l\'un des éléments suivants: :values.',
    'exists' => 'Le choix :attribute est invalide.',
    'file' => ':attribute doit être un fichier.',
    'filled' => ':attribute le champ doit avoir une valeur.',
    'gt' => [
        'numeric' => ':attribute doit être supérieur à :value.',
        'file' => ':attribute doit être supérieur à :value kilobytes.',
        'string' => ':attribute doit être supérieur à :value caractère.',
        'array' => ':attribute doit avoir plus de :value éléments.',
    ],
    'gte' => [
        'numeric' => ':attribute doit être supérieur ou égal :value.',
        'file' => ':attribute doit être supérieur ou égal :value kilobytes.',
        'string' => ':attribute doit être supérieur ou égal :value caractère.',
        'array' => ':attribute doit avoir:value élements ou plus.',
    ],
    'image' => ':attribute doit etre an image.',
    'in' => ':attribute sélectionné est invalide.',
    'in_array' => ':attribute le champ n\'existe pas dans :other.',
    'integer' => ':attribute doit etre un nombre entier.',
    'ip' => ':attribute doit être un email valide IP address.',
    'ipv4' => ':attribute doit être un email valide IPv4 address.',
    'ipv6' => ':attribute doit être un email valide IPv6 address.',
    'json' => ':attribute doit être un email valide JSON string.',
    'lt' => [
        'numeric' => ':attribute doit etre moins :value.',
        'file' => ':attribute doit etre moins :value kilobytes.',
        'string' => ':attribute doit etre moins :value caractère.',
        'array' => ':attribute must have moins :value élements.',
    ],
    'lte' => [
        'numeric' => ':attribute doit etre moins  ou égal :value.',
        'file' => ':attribute doit etre moins  ou égal :value kilobytes.',
        'string' => ':attribute doit etre moins  ou égal :value caractère.',
        'array' => ':attribute ne doit pas avoir plus de :value élements.',
    ],
    'max' => [
        'numeric' => ':attribute ne doit pas être supérieur à :max.',
        'file' => ':attribute ne doit pas être supérieur à :max kilobytes.',
        'string' => ':attribute ne doit pas être supérieur à :max caractère.',
        'array' => ':attribute ne doit pas avoir plus de :max élements.',
    ],
    'mimes' => ':attribute doit etre un fichier de type: :values.',
    'mimetypes' => ':attribute doit etre un fichier de type: :values.',
    'min' => [
        'numeric' => ':attribute doit etre au moins :min.',
        'file' => ':attribute doit etre au moins :min kilobytes.',
        'string' => ':attribute doit etre au moins :min caractère.',
        'array' => ':attribute doit etre au moins :min élements.',
    ],
    'multiple_of' => ':attribute doit etre un multiple de :value.',
    'not_in' => 'Le selected :attribute est invalide.',
    'not_regex' => ':attribute le format n\'est pas valide.',
    'numeric' => ':attribute doit etre un nombre.',
    'password' => 'Le Le mot de passe est incorrect.',
    'present' => ':attribute champ doit etre present.',
    'regex' => ':attribute le format n\'est pas valide.',
    'required' => ':attribute champ est obligatoire.',
    'required_if' => ':attribute champ est obligatoire when :other est :value.',
    'required_unless' => ':attribute champ est obligatoire sauf si :other est dans :values.',
    'required_with' => ':attribute champ est obligatoire lorsqu :valuessont présents.',
    'required_with_all' => ':attribute champ est obligatoire lorsqu :values sont présents.',
    'required_without' => ':attribute champ est obligatoire lorsque :values ne sont pas  présents.',
    'required_without_all' => ':attribute champ est obligatoire lorsqu\'aucun de ces :values sont présents.',
    'prohibited' => ':attribute est interdit.',
    'prohibited_if' => ':attribute est interdit lorsque :other est :value.',
    'prohibited_unless' => ':attribute est interdit sauf si :other est dans :values.',
    'prohibits' => ':attribute  est interdit :other d\'être présent.',
    'same' => ':attribute et  :other doit correspondre.',
    'size' => [
        'numeric' => ':attribute doit etre :size.',
        'file' => ':attribute doit etre :size kilobytes.',
        'string' => ':attribute doit etre :size caractère.',
        'array' => ':attribute doit contenir :size élements.',
    ],
    'starts_with' => ':attribute : doit commencer par l\'un des éléments suivants:values.',
    'string' => ':attribute doit être une chaîne de caractère.',
    'timezone' => ':attribute doit être un email valide fuseau horaire.',
    'unique' => ':attribute a déjà été pris.',
    'uploaded' => ' :attribute échec du téléchargement.',
    'url' => ' :attribute doit être un email valide URL.',
    'uuid' => ' :attribute doit être un email valide UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using
    | convention "attribute.rule" to name Le lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | Le following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];