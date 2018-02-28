package com.gymapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

/**
 * Created by User on 02/01/2018.
 */

public class SplashActivity extends AppCompatActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //Make a new intent for the splash screen
        Intent splashIntent = new Intent(this, MainActivity.class);
        startActivity(splashIntent);
        finish();
    }

}
